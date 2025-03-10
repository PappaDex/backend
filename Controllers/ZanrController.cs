using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ZbirkaIgara.Data;
using ZbirkaIgara.Models.DTO;
using ZbirkaIgara.Models;
using Microsoft.EntityFrameworkCore;

namespace ZbirkaIgara.Controllers
{

	[ApiController]
	[Route("api/v1/[controller]/")]
	public class ZanrController(ZbirkaIgaraContext context, IMapper mapper) : BackendController(context, mapper)
	{
		[HttpGet]
		[Route("DohvatiSveZanrove")]
		public async Task<ActionResult<List<ZanrDTO>>> GetSveZanrove()
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var zanrovi = await _context.Zanrovi.ToListAsync();
				return Ok(_mapper.Map<List<ZanrDTO>>(zanrovi));

			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpGet]
		[Route("DohvatiZanr")]
		public async Task<ActionResult<ZanrDTO>> GetZanr(int IdZanra)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var zanr = await _context.Zanrovi.FirstOrDefaultAsync(zanr => zanr.Id == IdZanra);
				if (zanr == null)
				{
					return NotFound(new { poruka = "Žanr nije pronađen." });
				}
				return Ok(_mapper.Map<ZanrDTO>(zanr));
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpPost]
		[Route("UpdateZanr")]
		public async Task<ActionResult<List<ZanrDTO>>> UrediZanr(ZanrDTO AzuriranZanr)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var zanr = await _context.Zanrovi.FindAsync(AzuriranZanr.Id);
				if (zanr == null)
				{
					return NotFound(new { poruka = "Žanr nije pronađen." });
				}
				zanr.ImeZanra = AzuriranZanr.ImeZanra;

				await _context.SaveChangesAsync();

				return Ok("Uspješno ažurirano!");
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpPost]
		[Route("DodajZanr")]
		public async Task<ActionResult<ZanrDTO>> DodajZanr(ZanrDTO noviZanr)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var zanr = _mapper.Map<Zanr>(noviZanr);
				_context.Zanrovi.Add(zanr);
				await _context.SaveChangesAsync();
				return Ok(_mapper.Map<ZanrDTO>(zanr));
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
		[HttpDelete]
		[Route("ObrisiZanr")]
		public async Task<ActionResult> ObrisiZanr(int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(new { poruka = ModelState });
			}
			try
			{
				var zanr = await _context.Zanrovi.FindAsync(id);
				if (zanr == null)
				{
					return NotFound(new { poruka = "Zanr nije pronađen." });
				}
				_context.Zanrovi.Remove(zanr);
				await _context.SaveChangesAsync();
				return Ok("Zanr je uspješno obrisan.");
			}
			catch (Exception ex)
			{
				return BadRequest(new { poruka = ex.Message });
			}
		}
	}
}
