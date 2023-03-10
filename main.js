$(document).ready(() => {

    var bilans = [];

    const faireBilan= (name, description, data) => {
      let bilan = {
        name: name,
        description: description,
        data:data
       
      };
      bilans.push(bilan);
    };


faireBilan("Mchat","evaluation-des-troubles autistique",["Votre enfant aime t-il être balancé sur vos genoux?","Votre enfant s'intéresse t-il à d'autres enfants?","Votre enfant aime t-il monter sur des meubles ou des escaliers?","Votre enfant aime t-il jouer aux jeux de cache-cache ou ‘coucou me voilà’?"," Votre enfant joue t-il a des jeux de faire semblant par exempl, fait-il semblant de parler au téléphone ou joue t-il avec des peluches ou des poupées ou à d'autres jeux?","Votre enfant utilise t-il son index pour pointer en demandant quelque chose?","Votre enfant utilise t-il son index en pointant pour vous montrer des choses qui l'intéressent?","Votre enfant joue t-il correctement avec de petits jouets (des voitures,des cubes) sans les porter à la bouche, tripoter ou les faire tomber?","Votre enfant amène t-il de objets pour vous les montrer?","Votre enfant regarde t-il dans vos yeux plus d'une seconde ou deux?","Arrive t-il que votre enfant semble excessivement sensible à des bruits?(jusqu’à se boucher les oreilles)","Votre enfant vous sourit-il en réponse à votre sourire?","Votre enfant vous imite t-il? (par exemple, si vous faites une grimace,le ferait-il en imitation?)","Votre enfant répond-il à son nom quand vous l'appelez?","Si vous pointez vers un jouet de l'autre côté de la pièce, votre enfant suivra t-il des yeux?","Votre enfant marche t-il sans aide?","Votre enfant regarde t-il des objets que vous regardez?","Votre enfant fait-il des gestes inhabituels avec ses mains près du visage?","Votre enfant essaie t-il d'attirer votre attention vers son activité?","Vous êtes vous demandé si votre enfant était sourd?","Votre enfant comprend-il ce que les gens disent?","Arrive t-il que votre enfant regarde dans le vide ou qu'il se promène sans but?","Votre enfant regarde t-il votre visage pour vérifier votre réaction quand il est face à une situation inhabituelle?"])


var i=0;
var rep=[];
var progress = 0;



//button suivant
$("#suivant").on("click",()=>{
    calculeResulat();
    regroupementDesReponses();
    $(".progress-bar").show();
   
    if( i<bilans[0].data.length-1){
        
        $("#suivant").hide();
    i++;
    
    $("#precedent").show();
    $("#reponse").html("");
    $("#qn").html("");
    $("#qn").append(`${i+1}`);
    $("#questionnaire").html("");
    $("#questionnaire").append(`${bilans[0].data[i]} <div class="progress-bar">
    <div class="progress"></div>
  </div>`);
    if (rep[i]) {
        $("#reponse").append(`<h4>Votre réponse précédente était: <span id="rep">${rep[i]}</span></h4>`);
        $("#suivant").show();
      }
      progress +=100/(bilans[0].data.length-1);
      

   $(".progress").css("width",progress +"%");
  
}

else {i=bilans[0].data.length-1; 
    $("#suivant").hide();
    
   
};
});
//button precedent
$("#precedent").on("click",()=>{
  
 
     if(i>0 ){
        
        $("#suivant").show()
        i--;
       
        $("#qn").html("");
        $("#qn").append(`${i+1}`);
        $("#reponse").html("");
        $("#reponse").append(`<h4>Votre réponse précédente était: <span id="rep">${rep[i]}</span> `);

    $("#questionnaire").html("");
    $("#questionnaire").append(`${bilans[0].data[i]} <div class="progress-bar">
    <div class="progress"></div>
  </div>`);
    $("#result").hide();
    progress -= 100/(bilans[0].data.length-1);
    

    $(".progress").css("width",progress +"%")
    
}

 else {
    i=0;
    $("#precedent").hide();
   
    }
});

// button oui

$("#oui").on("click",()=>{
    rep[i]="Oui";
    $(".titre").hide();
    $(".main").css("top","50%");
    if(i===bilans[0].data.length-1){ 
        $("#suivant").hide();
        $("#reponse").html("");
        $("#reponse").append('<h4>Votre réponse est: <span id="rep">Non</span> ');
        $("#result").show();
    
        }
        else{ 
    $("#suivant").show();
    $("#reponse").html("");
    $("#reponse").append('<h4>Votre réponse est: <span id="rep">Oui</span> ');
}
   
    
});

//button non
$("#non").on("click",()=>{ 
    rep[i]="Non";
    $(".titre").hide();
    $(".main").css("top","50%");
    if(i===bilans[0].data.length-1){ 
    $("#suivant").hide();
    $("#reponse").html("");
    $("#reponse").append('<h4>Votre réponse est: <span id="rep">Non</span> ');
    $("#result").show();

    }
    
   else{$("#suivant").show();
    $("#reponse").html("");
    $("#reponse").append('<h4>Votre réponse est: <span id="rep">Non</span> ');
}
    
});

//resultat du test

function calculeResulat(){
    let rs=0;
    
    for(c=0;c<rep.length;c++){
        if (c!=17 && c!=19 && c!=21){
          if (rep[c]==="Non") {rs++;console.log(rs)}
          } 
          else{
            if(rep[c]==="Oui"){rs++;console.log(rs)}
          }

        }
        return rs;
    }

    //affichage resultat
   var emailMessage;

    $("#result").on("click",()=>{

        if (calculeResulat()<=2){
          emailMessage=`RIS­QUE FAI­BLE : le score M-chat est de : ${calculeResulat()}/23, si l’enfant a moins de 24 mois, repasser le test après le deuxième anniversaire. Aucune autre action n’est requise à moins qu’une surveillance indique un risque de TSA. 
       
          Vos réponses :
       
          `;

            let message=`<span style="color:green">RIS­QUE FAI­BLE</span> : le score M-chat est de : <span style="color:green">${calculeResulat()}/23</span>, si l’enfant a moins de 24 mois, repasser le test après le deuxième anniversaire. Aucune autre action n’est requise à moins qu’une surveillance indique un risque de TSA.`;
           
         $("#qs").html("");

         $("#qs").append(`<h2>${message}</h2>
         <button id="btnmail" >Recevoir ce résultat par e-mail</button>`);
               //button mail
$("#btnmail").on("click",()=>{
  $("#qs").html("");
  $("#qs").css("background-color","rgb(240, 255, 255,0.0)");

  $("#rsmail").show();

})
         
        }
       else if(calculeResulat()>2 && calculeResulat()<=7){

        emailMessage= `RIS­QUE MO­YEN : Le score M-chat est de :  ${calculeResulat()}/23,faire passer le test de suivi (deuxième étape du M-CHAT-R/F) afin d’obtenir des informations complémentaires sur les réponses à risque. Si le score du M-CHAT-R/F reste de 2 ou plus, le résultat est positif. Action requise : orientez l’enfant pour une évaluation diagnostic ainsi qu’une évaluation d’éligibilité pour une prise en charge précoce. Si le score du test de suivi est de 0 à 1, le résultat est négatif. Aucune autre action n’est requise à moins qu’une surveillance indique un risque de TSA. L’enfant devra être réévalué lors des visites médicales suivantes.
        
       Vos réponses :
       
       `;

        let message=`<span style="color:orange">RIS­QUE MO­YEN</span> : Le score M-chat est de : <span style="color:orange">${calculeResulat()}/23</span>,faire passer le test de suivi (deuxième étape du M-CHAT-R/F) afin d’obtenir des informations complémentaires sur les réponses à risque. Si le score du M-CHAT-R/F reste de 2 ou plus, le résultat est positif. Action requise : orientez l’enfant pour une évaluation diagnostic ainsi qu’une évaluation d’éligibilité pour une prise en charge précoce. Si le score du test de suivi est de 0 à 1, le résultat est négatif. Aucune autre action n’est requise à moins qu’une surveillance indique un risque de TSA. L’enfant devra être réévalué lors des visites médicales suivantes.`;
        
        $("#qs").html("");
        $("#qs").append(`<h2>${message}</h2>
        <button id="btnmail" >Recevoir ce résultat par e-mail</button>`);
              //button mail
$("#btnmail").on("click",()=>{
  $("#qs").html("");
  $("#qs").css("background-color","rgb(240, 255, 255,0.0)")

  $("#rsmail").show();

})
         
    }
       else{

        emailMessage=`RIS­QUE ÉLE­VÉ : Le score M-chat est de : ${calculeResulat()}/23, contactez votre medecin pour procéder directement à une évaluation de diagnostic ainsi qu’une évaluation d’éligibilité pour une prise en charge précoce.
        
        Vos réponses :
       
        `;

        let message=`<span style="color:red">RIS­QUE ÉLE­VÉ </span>: Le score M-chat est de : <span style="color:red">${calculeResulat()}/23</span>, contactez votre medecin pour procéder directement à une évaluation de diagnostic ainsi qu’une évaluation d’éligibilité pour une prise en charge précoce.
      `
      
        $("#qs").html("");
        $("#qs").append(`<h2>${message}</h2>
        <button id="btnmail" >Recevoir ce résultat par e-mail</button>`);
      //button mail
$("#btnmail").on("click",()=>{
  $("#qs").html("");
  $("#qs").css("background-color","rgb(240, 255, 255,0.0)")

  $("#rsmail").show();

     
})
     }

    })
    setInterval(() => {
        $("#result").toggleClass("cli");
      }, 500);
      
      
//regroupement des reponses


function regroupementDesReponses(){
  let reponse="";
for (let i=0;i<bilans[0].data.length;i++){

reponse+=`Question ${i+1} : ${bilans[0].data[i]}  
Vous avez répondu : ${rep[i]}.

`
}

 return  emailMessage + reponse

}




// envoi mail avec mailjs

  $('form').submit((event)=> {
    event.preventDefault(); 
    

   
    var name = $('#name').val();
    var email = $('#email').val();
   

   
    emailjs.send("service_92naxtq", "template_6qpumfy", { 
      from_name:"Bilan M-CHAT",
      to_name: name, 
      to_email: email,
      message: regroupementDesReponses()
    }).then(function(reponse) {

      $("#rsmail").html("");
      $("#rsmail").append(`<h1 class="succes">E-mail envoyé avec succès vers ${email} ! </h1>`)
      console.log("SUCCES", reponse);
     
    }, function(ereur) {
      console.log("FAILED", ereur);
      alert("Échec d'envoi d'e-mail vers "+email);
    });
  });

})