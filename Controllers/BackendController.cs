using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ZbirkaIgara.Data;
using ZbirkaIgara.Models; 

namespace ZbirkaIgara.Controllers
{
    public abstract class BackendController:ControllerBase
    {
        protected readonly ZbirkaIgaraContext _context;

        protected readonly IMapper _mapper;

        public BackendController(ZbirkaIgaraContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
