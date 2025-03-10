using AutoMapper;
using ZbirkaIgara.Models;
using ZbirkaIgara.Models.DTO;

namespace ZbirkaIgara.Mapping
{
    public class BackendAutoMapper:Profile
    {
        public BackendAutoMapper() {

            CreateMap<Igra, IgraDTO>();
			CreateMap<IgraDTO, Igra>();
			CreateMap<Zanr, ZanrDTO>();
			CreateMap<ZanrDTO, Zanr>();

		}
	}
}
