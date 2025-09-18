$(document).ready(function(){
  function myFunction(x) {
  if (x.matches) { 
    $(".cadeirante").animate({left: '16%', top: '0%'}, 3000);
  } else {
   $(".cadeirante").animate({left: '14%', top: '7%'}, 3000);
  }
}

var x = window.matchMedia("(max-width: 478px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


  // Ações do usuário que mostram e/ou escondem o logotipo.
  // Por padrão, mostra no topo e fim da página.
  // Remova ou reescreva de acordo com o projeto.

  $(window).scroll(function(){

    var nav = $("nav");
    var scroll = $(window).scrollTop();

    // Mostra o nav quando a página está no topo
    if(scroll == 0){
      nav.fadeIn();
    //Mostra a nav quando a página chega no fim
   // } else if (scroll == $(document).height() - $(window).height()) {
      //nav.fadeIn();
    //Esconde a nav
    } else {
      nav.fadeOut();
    }

  });

  // Volta uma etapa

  $(".etapa .voltarEtapa").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  // Avança uma etapa ou mostra mensagem de erro

  $(".etapa .avancarEtapa").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    if($(this).hasClass("habilitado")){
      etapaAtual.hide();
      etapaAtual.next(".etapa").fadeIn("slow");
    } else {
      etapaAtual.find(".mensagem-erro").fadeIn();
    }
  });


  $("#navOrientada .avancarEtapa").on("click", function(){
    $("#autoaval_orientada ol li").each(function(){
      var lengthChecked = $(this).find("input:checked").length;
      if(lengthChecked == 0){
        $(this).addClass("form-error");
      }
    });
  })

  // Clique nos botões de navegação entre etapas scrolla página para o topo

  $(".voltarEtapa, .avancarEtapa, .avancarEtapa3, .avancarEtapa4").on("click", function(){
    $('html,body').scrollTop(0);
  })

  // Aplica estilo na opção selecionada em Autoavaliação Espontânea

  $("input").on("click", function(){
    var formcheck = $(this).parent();
    if($(this).is(":checked")){
      formcheck.addClass("selecionado");
      formcheck.siblings().removeClass("selecionado");
    };
  });

  // Fixa labels da Autoavaliação orientada no scroll

  $("#autoaval_orientada .labels-header").stick_in_parent();

  // Volta ou avança perguntas da Autoavaliação Orientada

  $("#navPerguntas .avancarPergunta").on("click", function(){
    var perguntaAtual = $(".atual");
    // Verifica se respondeu
    var lengthChecked = perguntaAtual.find("input:checked").length;
    var mensagemErro = perguntaAtual.parent("ol").siblings(".mensagem-erro");
    // Se sim, avança
    if(lengthChecked != 0){
      mensagemErro.hide();
      perguntaAtual.removeClass("form-error atual");
      perguntaAtual.next("li").addClass("atual");
    // Se não, exibe erro
    } else {
      mensagemErro.show();
      perguntaAtual.addClass("form-error");
    }
    // Remove mensagem de erro quando o input é marcado
    $(".atual input").on("change", function(){
      mensagemErro.hide();
    })
    // Atualiza navegação
    atualizaNavPerguntas();
  });

  $("#navPerguntas .voltarPergunta").on("click", function(){
    var perguntaAtual = $(".atual");
    perguntaAtual.removeClass("atual");
    perguntaAtual.prev("li").addClass("atual");
    atualizaNavPerguntas();
  })

  // Se primeira pergunta ou última pergunta, exibe botão de navegação entre etapas

  function atualizaNavPerguntas(){
    $("#navPerguntas div:first-child").attr("class", "");
    if($(".atual").index() == 0){
      $("#navPerguntas div").addClass("inicio");
    } else if($(".atual").index() == $("#autoaval_orientada li").length - 1){
      $("#navPerguntas div").addClass("fim");
    } else {
      $("#navPerguntas div").addClass("meio");
    }
  }

  // Libera botão após todos os campos da etapa estarem preenchidos

  $("#autoaval_espontanea input").on("change", function(){
    $("#autoaval_espontanea .btn.avancarEtapa")
      .addClass("habilitado")
      .parents(".etapa").find(".mensagem-erro").fadeOut();
  })


  $("#autoaval_orientada input").on("change", function(){
    var lengthChecked = $("#autoaval_orientada input:checked").length;
    var lengthLi = $("#autoaval_orientada .input-group").length;
    console.log(lengthChecked);
    console.log(lengthLi)
    if(lengthChecked == lengthLi){
      $("#autoaval_orientada .avancarEtapa")
        .addClass("habilitado")
        .parents(".etapa").find(".mensagem-erro").fadeOut();
    }
    $(this).parents("li").removeClass("form-error");

    // Atualiza barra de progresso da visualização para telas pequenas

    var perc_pergunta = 100/lengthLi;
    var perc_usuario = lengthChecked * perc_pergunta;

    $("#navPerguntas .barra-progresso > div").css("width", perc_usuario + "%");
  })

  $(".btn-detalhada").on("click", function(){
    $("#resposta_detalhada").fadeIn("slow");
    $('html, body').animate({
      scrollTop: $("#resposta_detalhada").offset().top - 60
    }, 1000)
  })

  // Libera conclusão e popup de impressão

  $("#btnConclusao").on("click", function(){
    $(this).hide();
    $("#conclusao").fadeIn("slow");
    $('html, body').animate({
      scrollTop: $("#conclusao").offset().top - 60
    }, 1000)
    $(".popup").addClass("visible");
  })
});


  numero_questoes = 35;
  
  numero_alternativas = 5;
  
  parte1 = [];

  
  //Vai guardar os valores que o usuario marcar
  var total = [];


  for (var i = 0; i < numero_questoes; i++ ) {
    total[i] = 0;  
  }

$('.favoraveis').on('input', function() {
    
    //Pega do atributo name, o número do pergunta.
    var pergunta = $(this).attr('name').substring(10,12);
    console.log("numero pergunta" + pergunta);
    //Varifica pelo atributo value qual opção ele marcou.
    var marcou = ($(this).attr('value').substring(6,7));
    console.log("opcao que marcou"+ marcou);
    //Guarda a soma de todos.
      
    //Guarda neste array qual opção foi marcada, exemplo total[17] = 2,
    //quer dizer que na pergunta 17 ele marcou 2.
    total[pergunta-1] = marcou;
    console.log(total);
    let soma = 0;
     for (var i = 0; i < total.length; i++) {
       soma = soma +  parseFloat(total[i])
     }
     console.log(soma);
     var perc_pergunta = 100/75;
     var perc_usuario1 = parseInt(soma * perc_pergunta);
     console.log(perc_usuario1);
     $(".barra-progresso9 > div").css("width", perc_usuario1 + "%");
     $(".barra-progresso9 > div").text(soma + " pts");
   });

  numero_questoes2 = 35;
  
  numero_alternativas2 = 5;
  
  parte2 = [];

  
  //Vai guardar os valores que o usuario marcar
  var total2 = [];


  for (var i = 0; i < numero_questoes2; i++ ) {
    total2[i] = 0;  
  }
  $('.desfavoraveis').on('input', function() {
    
    //Pega do atributo name, o número do pergunta.
    var pergunta2 = $(this).attr('name').substring(13,15);
    console.log("numero pergunta" + pergunta2);
    //Varifica pelo atributo value qual opção ele marcou.
    var marcou2 = ($(this).attr('value').substring(6,7));
    console.log("opcao que marcou"+ marcou2);
    //Guarda a soma de todos.
      
    //Guarda neste array qual opção foi marcada, exemplo total[17] = 2,
    //quer dizer que na pergunta 17 ele marcou 2.
    total2[pergunta2-1] = marcou2;
    console.log(total2);
    let soma2 = 0;
     for (var i = 0; i < total2.length; i++) {
       soma2 = soma2 +  parseFloat(total2[i])
     }
     console.log(soma2);
     var perc_pergunta2 = 100/75;
     var perc_usuario2 = parseInt(soma2 * perc_pergunta2);
     console.log(perc_usuario2);
     $(".barra-progresso10 > div").css("width", perc_usuario2 + "%");
     $(".barra-progresso10 > div").text(soma2 + " pts");
   });

      numero_questoes3 = 35;
  
      numero_alternativas3 = 5;
      
      parte3 = [];

      
      //Vai guardar os valores que o usuario marcar
      var total3 = [];


      for (var i = 0; i < numero_questoes3; i++ ) {
        total3[i] = 0;  
      }
      $('.mentira').on('input', function() {
        
        //Pega do atributo name, o número do pergunta.
        var pergunta3 = $(this).attr('name').substring(7,9);
        console.log("numero pergunta" + pergunta3);
        //Varifica pelo atributo value qual opção ele marcou.
        var marcou3 = ($(this).attr('value').substring(6,7));
        console.log("opcao que marcou"+ marcou3);
        //Guarda a soma de todos.
          
        //Guarda neste array qual opção foi marcada, exemplo total[17] = 2,
        //quer dizer que na pergunta 17 ele marcou 2.
        total3[pergunta3-1] = marcou3;
        console.log(total3);
        let soma3 = 0;
         for (var i = 0; i < total3.length; i++) {
           soma3 = soma3 +  parseFloat(total3[i])
         }
         console.log(soma3);

         var perc_pergunta3 = (100/5);
         var perc_usuario3 = parseInt(soma3 * perc_pergunta3);
         console.log(perc_usuario3);
         $(".barra-progresso11 > div").css("width", perc_usuario3 + "%");
         $(".barra-progresso11 > div").text(soma3 + "pts");
       });


 $(".etapa .voltarEtapa3").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  $(".etapa .voltarEtapa4").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  $(".etapa .voltarEtapa5").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

$(".avancarEtapa5").click(function(){
   window.location.replace('index.html');
     });
	
