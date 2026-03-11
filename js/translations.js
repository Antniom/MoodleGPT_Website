const translations = {
    en: {
        navFeatures: "Features",
        navLocal: "Local Mode",
        navSetup: "Setup Guide",
        navFaq: "FAQ",
        navGetExt: "Get Extension",
        heroBadge: "v3.0 Now Available",
        heroTitlePrefix: "Your Personal",
        heroSubtitle: "High-performance automation for Moodle.<br>Powered by <span class=\"highlight\">Gemini Flash</span> & <span class=\"highlight\">Gemini Pro</span>.",
        heroBtnFeatures: "See features",
        heroBtnInstall: "Installation",

        // Showcase
        showcaseTitle: "Precision Tools",
        showcaseSubtitle: "Five powerful ways to interact.",

        cardExtractTitle: "Global Extraction",
        cardExtractDesc: "Instantly solve every visible question on the page. <span class=\"code\">Alt+C</span> triggers the extraction engine, scanning the DOM and filling answers from the shared database.",

        cardStealthTitle: "Stealth Mode",
        cardStealthDesc: "Panic button integration. <span class=\"code\">Alt+X</span> instantly removes all UI elements from the DOM. Press again to restore.",

        cardAutoTitle: "Smart Automation",
        cardAutoDesc: "<span class=\"code\">Alt+A</span> engages the autopilot. The extension answers questions sequentially with humanized randomized delays (4-15s) to avoid detection.",

        cardDblClickTitle: "Quick Answer",
        cardDblClickDesc: "Surgical precision. <strong>Double-click</strong> any question text to solve just that specific item. The correct option is selected immediately.",

        cardContextTitle: "Context Menu",
        cardContextDesc: "Right-click integration. Select snippet text or entire questions, right-click, and choose <strong>Answer Question</strong> to force a database check.",

        cardEssayTitle: "Essay Assistant",
        cardEssayDesc: "Two modes for long-form answers. <strong>Default</strong> shows a non-intrusive glass overlay. <strong>Direct Input</strong> simulates human typing keystroke-by-keystroke directly into the editor.",

        // Setup
        setupTitle: "Installation Guide",
        step1Title: "Download Extension",
        step1Desc: "Download MoodleGPT 3 from the Chrome Web Store. It costs a <strong>one-time payment of 7€ ($8.30)</strong> for a lifetime license.",
        step2Title: "Get API Key",
        step2Desc: "Go to Google AI Studio and generate a free API Key. Supported models include <strong>Gemini 3.0 Pro Preview</strong>, <strong>Gemini 2.5 Pro</strong>, and <strong>Gemini 2.5 Flash</strong>.",
        step2Btn: "Get Free Key",
        step3Title: "Configure & Activate",
        step3Desc: "Click the extension icon, paste your API Key in settings, and click \"Validate\". You are now ready to solve quizzes.",

        // FAQ
        faqTitle: "Frequently Asked Questions",
        faq1Q: "Can Moodle detect this extension?",
        faq1A: "While no tool is 100% undetectable, MoodleGPT 3 is built with a Stealth First architecture. It uses Shadow DOM injection (or no injection in stealth mode) and randomized delays for automation to mimic human behavior. Use <strong>Alt+X</strong> to instantly hide all UI.",
        faq2Q: "Do I need to pay for Gemini?",
        faq2A: "Google provides a generous free tier for Gemini API keys that is sufficient for most students. If you exceed the free quota, you may need a paid Google Cloud account, but MoodleGPT itself just needs a valid key.",
        faq3Q: "What is Crowd Intelligence?",
        faq3A: "When anyone using MoodleGPT solves a question, the answer is hashed and stored in our database. If you encounter the same question, the answer is retrieved instantly. The database synchronizes approximately <strong>every 10 minutes</strong>.",
        faq4Q: "Why does it require a license?",
        faq4A: "MoodleGPT 3 requires paid maintenance of the reliable backend infrastructure that powers the Crowd Intelligence database and secure authentication.",

        // Footer & TOS
        footerPrivacy: "Terms of Service",
        footerContact: "Contact Support",
        tosTitle: "Terms of Service",
        tosAcceptBtn: "Accept & Go to Web Store",

        // Local Page
        localBadge: "BETA",
        localTitle: "Local Runtime",
        localSubtitle: "Supercharge your extension with offline, strictly confidential AI computation securely hosted on your own machine.",
        localBetaBanner: "MoodleGPT Local is currently in Beta. You may experience occasional bugs or unoptimized performance. Help us improve by reporting unexpected behavior.",
        localFeat1Title: "Private 100% Local Inference",
        localFeat1Desc: "Leverage Local LLMs (like Llama 3 via Ollama) directly on your device. Absolutely zero queries, answers, or quiz data are transmitted to external servers. Your academic integrity and data remain entirely isolated on your machine.",
        localFeat2Title: "Zero API Costs",
        localFeat2Desc: "No need for paid Gemini or OpenAI subscription keys. The Local Runtime uses your hardware to generate responses efficiently, enabling unlimited solving without counting tokens.",
        localFeat3Title: "RAG System (Knowledge Base)",
        localFeat3Desc: "The Local Runtime includes a custom Knowledge Base (Retrieval-Augmented Generation) system. Drop texts and course documents into the app, and the AI will scan your lectures to construct highly accurate, course-specific answers.",
        localFeat4Title: "Seamless Extension Integration",
        localFeat4Desc: "It acts as a backend bridge for your MoodleGPT 3 Chrome Extension. Just keep it running in the background. The extension will automatically detect it and route queries through Native Messaging.",
        localDownloadBtn: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px;" aria-hidden="true"><path d="M8 3v7M4 7l4 4 4-4"/><line x1="2" y1="13" x2="14" y2="13"/></svg>Download MoodleGPT Local Setup (Windows)',
        localDownloadInfo: "Version 2.0.0 | ~95MB | Requires a 64-bit Windows system",
        localConnectTitle: "How does it connect?",
        localConnectDesc: "Install the application, open it, and leave it running. The Chrome extension utilizes a Native Messaging protocol to securely interact with the local client, bypassing traditional web requests entirely."
    },
    pt: {
        navFeatures: "Funcionalidades",
        navLocal: "Modo Local",
        navSetup: "Guia de Instalação",
        navFaq: "FAQ",
        navGetExt: "Obter Extensão",
        heroBadge: "v3.0 Já Disponível",
        heroTitlePrefix: "O Seu Assistente",
        heroSubtitle: "Automação de alto desempenho para Moodle.<br>Com <span class=\"highlight\">Gemini 3 Pro Preview</span>, <span class=\"highlight\">2.5 Flash</span> & <span class=\"highlight\">2.5 Pro</span>.",
        heroBtnFeatures: "Ver recursos",
        heroBtnInstall: "Instalação",

        // Showcase
        showcaseTitle: "Ferramentas de Precisão",
        showcaseSubtitle: "Cinco formas poderosas de interagir.",

        cardExtractTitle: "Extração Global",
        cardExtractDesc: "Resolva instantaneamente todas as perguntas visíveis. <span class=\"code\">Alt+C</span> aciona o motor de extração, verificando o DOM e preenchendo respostas da base de dados partilhada.",

        cardStealthTitle: "Modo Furtivo",
        cardStealthDesc: "Botão de pânico integrado. <span class=\"code\">Alt+X</span> remove instantaneamente todos os elementos da interface. Pressione novamente para restaurar.",

        cardAutoTitle: "Automação Inteligente",
        cardAutoDesc: "<span class=\"code\">Alt+A</span> ativa o piloto automático. A extensão responde às perguntas sequencialmente com atrasos aleatórios humanizados (4-15s) para evitar deteção.",

        cardDblClickTitle: "Resposta Rápida",
        cardDblClickDesc: "Precisão cirúrgica. <strong>Duplo clique</strong> em qualquer texto de pergunta para resolver apenas esse item. A opção correta é selecionada imediatamente.",

        cardContextTitle: "Menu de Contexto",
        cardContextDesc: "Integração com clique direito. Selecione texto ou perguntas, clique com o botão direito e escolha <strong>Responder Pergunta</strong> para forçar uma verificação na base de dados.",

        cardEssayTitle: "Assistente de Ensaio",
        cardEssayDesc: "Dois modos para respostas longas. <strong>Padrão</strong> mostra uma sobreposição discreta. <strong>Entrada Direta</strong> simula a digitação humana tecla a tecla diretamente no editor.",

        // Setup
        setupTitle: "Guia de Instalação",
        step1Title: "Baixar Extensão",
        step1Desc: "Baixe o MoodleGPT 3 da Chrome Web Store. Custa um <strong>pagamento único de 7€ ($8.30)</strong> para uma licença vitalícia.",
        step2Title: "Obter Chave API",
        step2Desc: "Vá ao Google AI Studio e gere uma chave API gratuita. Modelos suportados incluem <strong>Gemini 3.0 Pro Preview</strong>, <strong>Gemini 2.5 Pro</strong> e <strong>Gemini 2.5 Flash</strong>.",
        step2Btn: "Obter Chave Grátis",
        step3Title: "Configurar e Ativar",
        step3Desc: "Clique no ícone da extensão, cole a sua chave API nas definições e clique em \"Validar\". Está pronto para resolver questionários.",

        // FAQ
        faqTitle: "Perguntas Frequentes",
        faq1Q: "O Moodle consegue detetar esta extensão?",
        faq1A: "Embora nenhuma ferramenta seja 100% indetetável, o MoodleGPT 3 é construído com arquitetura Stealth First. Usa injeção Shadow DOM (ou nenhuma injeção no modo furtivo) e atrasos aleatórios. Use <strong>Alt+X</strong> para esconder a interface instantaneamente.",
        faq2Q: "Preciso de pagar pelo Gemini?",
        faq2A: "A Google oferece um nível gratuito generoso para chaves API Gemini, suficiente para a maioria dos estudantes. Se exceder a quota, pode precisar de uma conta paga, mas o MoodleGPT apenas precisa de uma chave válida.",
        faq3Q: "O que é a Inteligência Coletiva?",
        faq3A: "Quando alguém resolve uma pergunta, a resposta é armazenada na nossa base de dados. Se encontrar a mesma pergunta, a resposta é recuperada instantaneamente. A base de dados sincroniza aproximadamente <strong>a cada 10 minutos</strong>.",
        faq4Q: "Por que requer uma licença?",
        faq4A: "O MoodleGPT 3 requer manutenção paga da infraestrutura de backend fiável que alimenta a base de dados de Inteligência Coletiva e autenticação segura.",

        // Footer & TOS
        footerPrivacy: "Termos de Serviço",
        footerContact: "Contactar Suporte",
        tosTitle: "Termos de Serviço",
        tosAcceptBtn: "Aceitar e Ir para Web Store",

        // Local Page
        localBadge: "BETA",
        localTitle: "Runtime Local",
        localSubtitle: "Potencie a sua extensão com computação de IA offline, estritamente confidencial e alojada na sua própria máquina.",
        localBetaBanner: "MoodleGPT Local está atualmente em Beta. Pode encontrar erros ocasionais ou performance não otimizada. Ajude-nos a melhorar reportando comportamentos inesperados.",
        localFeat1Title: "Inferência 100% Local e Privada",
        localFeat1Desc: "Use LLMs locais (como Llama 3 via Ollama) diretamente no seu dispositivo. Zero queries, respostas ou dados de quiz são transmitidos para servidores externos. A sua integridade académica e dados ficam totalmente isolados na sua máquina.",
        localFeat2Title: "Zero Custos de API",
        localFeat2Desc: "Sem necessidade de chaves de subscrição pagas do Gemini ou OpenAI. O Runtime Local usa o seu hardware para gerar respostas eficientemente, permitindo resolução ilimitada sem contar tokens.",
        localFeat3Title: "Sistema RAG (Base de Conhecimento)",
        localFeat3Desc: "O Runtime Local inclui um sistema de Base de Conhecimento personalizado (Retrieval-Augmented Generation). Adicione textos e documentos de curso na app, e a IA irá analisar as suas aulas para construir respostas altamente precisas e específicas.",
        localFeat4Title: "Integração Perfeita com a Extensão",
        localFeat4Desc: "Funciona como uma ponte de backend para a sua Extensão Chrome MoodleGPT 3. Basta mantê-lo a correr em segundo plano. A extensão irá detetá-lo automaticamente e encaminhar as queries via Native Messaging.",
        localDownloadBtn: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px;" aria-hidden="true"><path d="M8 3v7M4 7l4 4 4-4"/><line x1="2" y1="13" x2="14" y2="13"/></svg>Descarregar MoodleGPT Local Setup (Windows)',
        localDownloadInfo: "Versão 2.0.0 | ~95MB | Requer sistema Windows 64-bit",
        localConnectTitle: "Como é que se liga?",
        localConnectDesc: "Instale a aplicação, abra-a e deixe-a a correr. A extensão Chrome utiliza um protocolo de Native Messaging para interagir com o cliente local de forma segura, contornando completamente os pedidos web tradicionais."
    }
};

window.translations = translations;
