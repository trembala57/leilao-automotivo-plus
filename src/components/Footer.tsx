
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-vip-dark text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo and Copyright */}
            <div className="md:col-span-3 text-center md:text-left">
              <Link to="/" className="inline-block mb-4">
                <img 
                  src="https://www.vipleiloes.com.br/img/logo-branco.png" 
                  alt="VIP Leilões" 
                  className="h-16"
                />
              </Link>
              <p className="text-xs mb-4">
                Copyright © VIP Leilões<br />
                CNPJ n.° 08.187.134/0001-75 / Avenida Engenheiro<br />
                Emiliano Macieira, n° 01, Maracanã, São Luís/MA -<br />
                CEP 65095-602 - Empresa do grupo VIP
              </p>
              <div className="flex justify-center md:justify-start space-x-3">
                <a href="#" className="text-white hover:text-vip-lightblue">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-vip-lightblue">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-vip-lightblue">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-vip-lightblue">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-vip-lightblue">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-vip-lightblue">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.53 0c2.59 0 2.97.01 4.01.06 1.04.05 1.79.21 2.44.46.66.26 1.22.6 1.77 1.15.56.56.9 1.11 1.15 1.77.24.65.41 1.4.46 2.44.05 1.04.06 1.42.06 4.01s-.01 2.97-.06 4.01c-.05 1.04-.21 1.79-.46 2.44-.26.66-.6 1.22-1.15 1.77-.56.56-1.11.9-1.77 1.15-.65.24-1.4.41-2.44.46-1.04.05-1.42.06-4.01.06s-2.97-.01-4.01-.06c-1.04-.05-1.79-.21-2.44-.46-.66-.26-1.22-.6-1.77-1.15-.56-.56-.9-1.11-1.15-1.77-.24-.65-.41-1.4-.46-2.44C.01 15.5 0 15.12 0 12.53s.01-2.97.06-4.01c.05-1.04.21-1.79.46-2.44.26-.66.6-1.22 1.15-1.77.56-.56 1.11-.9 1.77-1.15.65-.24 1.4-.41 2.44-.46C9.56.01 9.94 0 12.53 0zm0 2.89c-2.55 0-2.9.01-3.93.06-.93.04-1.43.2-1.77.32-.44.17-.75.37-1.08.71-.33.33-.54.64-.71 1.08-.13.33-.28.83-.32 1.77-.05 1.02-.06 1.38-.06 3.93s.01 2.9.06 3.93c.04.93.2 1.43.32 1.77.17.44.37.75.71 1.08.33.33.64.54 1.08.71.33.13.83.28 1.77.32 1.02.05 1.38.06 3.93.06s2.9-.01 3.93-.06c.93-.04 1.43-.2 1.77-.32.44-.17.75-.37 1.08-.71.33-.33.54-.64.71-1.08.13-.33.28-.83.32-1.77.05-1.02.06-1.38.06-3.93s-.01-2.9-.06-3.93c-.04-.93-.2-1.43-.32-1.77-.17-.44-.37-.75-.71-1.08-.33-.33-.64-.54-1.08-.71-.33-.13-.83-.28-1.77-.32-1.02-.05-1.38-.06-3.93-.06zm0 1.73c1.71 0 1.9.01 2.58.05.63.03 1.07.16 1.4.33.38.16.67.34.97.64.3.3.48.59.64.97.17.33.3.77.33 1.4.04.68.05.87.05 2.58s-.01 1.9-.05 2.58c-.03.63-.16 1.07-.33 1.4-.16.38-.34.67-.64.97-.3.3-.59.48-.97.64-.33.17-.77.3-1.4.33-.68.04-.87.05-2.58.05s-1.9-.01-2.58-.05c-.63-.03-1.07-.16-1.4-.33-.38-.16-.67-.34-.97-.64-.3-.3-.48-.59-.64-.97-.17-.33-.3-.77-.33-1.4-.04-.68-.05-.87-.05-2.58s.01-1.9.05-2.58c.03-.63.16-1.07.33-1.4.16-.38.34-.67.64-.97.3-.3.59-.48.97-.64.33-.17.77-.3 1.4-.33.68-.04.87-.05 2.58-.05" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start">
              <div className="flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-white">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
                <h3 className="text-sm font-semibold uppercase">NAVEGUE PELO SITE:</h3>
              </div>
              <ul className="space-y-1 text-center md:text-left">
                <li>
                  <Link to="/quem-somos" className="text-xs text-gray-300 hover:text-vip-lightblue">Quem Somos</Link>
                </li>
                <li>
                  <Link to="/agenda" className="text-xs text-gray-300 hover:text-vip-lightblue">Agenda</Link>
                </li>
                <li>
                  <Link to="/como-comprar" className="text-xs text-gray-300 hover:text-vip-lightblue">Como Comprar</Link>
                </li>
                <li>
                  <Link to="/servicos" className="text-xs text-gray-300 hover:text-vip-lightblue">Serviços</Link>
                </li>
                <li>
                  <Link to="/quero-vender" className="text-xs text-gray-300 hover:text-vip-lightblue">Quero Vender</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-xs text-gray-300 hover:text-vip-lightblue">Blog</Link>
                </li>
                <li>
                  <Link to="/ajuda" className="text-xs text-gray-300 hover:text-vip-lightblue">Precisa de Ajuda?</Link>
                </li>
                <li>
                  <Link to="/privacidade" className="text-xs text-gray-300 hover:text-vip-lightblue">Política de Privacidade</Link>
                </li>
                <li>
                  <Link to="/dpo" className="text-xs text-gray-300 hover:text-vip-lightblue">DPO - Encarregado de Dados Pessoais (LGPD)</Link>
                </li>
                <li>
                  <Link to="/etica" className="text-xs text-gray-300 hover:text-vip-lightblue">Código de Ética e Conduta</Link>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <div className="flex justify-center md:justify-start mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-white">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <h3 className="text-sm font-semibold uppercase">NOSSA NEWSLETTER</h3>
              </div>
              <p className="text-xs mb-2 text-center md:text-left">
                Receba atualizações, novidades e ofertas exclusivas.
              </p>
              <div className="flex w-full mb-4">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="flex-grow rounded-l-sm px-3 py-2 text-xs text-black focus:outline-none"
                />
                <button className="bg-vip-lightblue px-3 py-2 rounded-r-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 14 0"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <img 
                  src="https://www.vipleiloes.com.br/img/logo-grupo-vip.png" 
                  alt="Grupo VIP" 
                  className="h-12"
                />
              </div>
            </div>
          </div>
          
          {/* Partner Logos */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex justify-center">
              <img 
                src="https://www.vipleiloes.com.br/img/logo-premio-tricampea.png" 
                alt="Prêmio Tricampeã" 
                className="h-10"
              />
            </div>
            <div className="flex justify-center">
              <img 
                src="https://www.vipleiloes.com.br/img/logo-leilaoseguro.png" 
                alt="Leilão Seguro" 
                className="h-10"
              />
            </div>
            <div className="flex justify-center">
              <img 
                src="https://www.vipleiloes.com.br/img/logo-aleibras.png" 
                alt="Aleibras" 
                className="h-10"
              />
            </div>
          </div>
          
          {/* Legal Text */}
          <div className="mt-8 text-xs leading-relaxed text-gray-400">
            <p>
              O parceiro que anuncia nesta página é o único responsável pelas transações comerciais que realizar com usuários do web site VIP Leilões. A comercialização do produto anunciado, bem como a garantia de sua legítima procedência, é de inteira responsabilidade do anunciante. As informações veiculadas nos anúncios deste site são de inteira responsabilidade do anunciante, não podendo o usuário responsabilizar a VIP Leilões pela veracidade e/ou autenticidade das mesmas. A VIP Leilões não é responsável por qualquer dano direto e/ou indireto causado a terceiros, advindos da exibição dos anúncios em desacordo com o Código de Defesa do Consumidor e outras legislações aplicáveis ao comércio e/ou prestação de serviços por parte do anunciante. As vendas e entregas aos usuários e/ou terceiros de produtos anunciados no site são de inteira responsabilidade do anunciante. O usuário reconhece como sendo de sua exclusiva responsabilidade os riscos assumidos nas negociações que vier a efetuar com outros usuários do site. Para oferecer uma melhor experiência de navegação, a VIP Leilões utiliza cookies. Ao navegar pelo site você concorda com o uso dos mesmos.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Fixed Button */}
      <div className="fixed right-4 bottom-4 z-50">
        <a 
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
