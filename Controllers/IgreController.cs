using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZbirkaIgara.Data;
using ZbirkaIgara.Models;
using ZbirkaIgara.Models.DTO;

namespace ZbirkaIgara.Controllers
{
	[ApiController]
	[Route("api/v1/[controller]/")]
	public class IgreController(ZbirkaIgaraContext context, IMapper mapper) : BackendController(context, mapper)
	{
		[HttpGet]
		[Route("DohvatiSveIgre")]
		public async Task<ActionResult<List<IgraDTO>>> GetSveIgre()
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var igre = await _context.Igre.ToListAsync();
				return Ok(_mapper.Map<List<IgraDTO>>(igre));

			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpGet]
		[Route("DohvatiIgru")]
		public async Task<ActionResult<IgraDTO>> GetIgru(int IdIgre)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var igra = await _context.Igre.FirstOrDefaultAsync(igra => igra.Id == IdIgre);
				if (igra == null)
				{
					return NotFound(new { poruka = "Igra nije pronađena." });
				}
				return Ok(_mapper.Map<IgraDTO>(igra));
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpGet]
		[Route("DohvatiIgruPoZanru")]
		public async Task<ActionResult<List<IgraDTO>>> GetIgruPoZanru(int IdZanra)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var igre = await _context.Igre.Where(igra => igra.IdZanra == IdZanra).ToListAsync();
				return Ok(_mapper.Map<List<IgraDTO>>(igre));
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpPost]
		[Route("UpdateIgru")]
		public async Task<ActionResult<List<IgraDTO>>> UpdateIgru(IgraDTO AzuriranaIgra)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var igra = await _context.Igre.FindAsync(AzuriranaIgra.Id);
				if (igra == null)
				{
					return NotFound(new { poruka = "Igra nije pronađena." });
				}

				igra.Naslov = AzuriranaIgra.Naslov;
				igra.Opis = AzuriranaIgra.Opis;
				igra.Hltb = AzuriranaIgra.Hltb;
				igra.Platforme = AzuriranaIgra.Platforme;
				igra.IdZanra = AzuriranaIgra.IdZanra;
				igra.Trailer = AzuriranaIgra.Trailer;
				igra.UrlSlike = AzuriranaIgra.UrlSlike;

				await _context.SaveChangesAsync();

				return Ok("Uspješno ažurirano!");
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpPost]
		[Route("DodajIgru")]
		public async Task<ActionResult<IgraDTO>> DodajIgru(IgraDTO novaIgra)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var igra = _mapper.Map<Igra>(novaIgra);
				_context.Igre.Add(igra);
				await _context.SaveChangesAsync();
				return Ok(_mapper.Map<IgraDTO>(igra));
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}

		[HttpDelete]
		[Route("ObrisiIgru")]
		public async Task<ActionResult> ObrisiIgru(int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var igra = await _context.Igre.FindAsync(id);
				if (igra == null)
				{
					return NotFound(new { poruka = "Igra nije pronađena." });
				}
				_context.Igre.Remove(igra);
				await _context.SaveChangesAsync();
				return Ok("Igra je uspješno obrisana.");
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
	}
}
