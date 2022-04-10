const immagini = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png", "img7.png", "img8.png", "img1.png", "img2.png",
    "img3.png", "img4.png", "img5.png", "img6.png", "img7.png", "img8.png"];

$(document).ready( main );

function main()
{   
    preparaSchema();
}

function preparaSchema()
{         
    
    let immagini = [];
    crea_e_mischia_immagini();

    for (let i=0; i<16; i++)
    {
        
        let src_immagine = " src='img/" + immagini[i] + "'";
        let img = "<img " + src_immagine +  "/>";
        
        let id_div = "id= 'div" + i + "'";
        let stato_div = " stato = 'coperta'";

        $(".box").append("<div " + id_div + 
                               stato_div + " class='images'>" + img + "</div>");
    }

    
    $("div>img").fadeToggle();

    
    let conta_carte = 16;            
    let id_prima_carta = "nessuna";

    
    $(".box>div").on("click", voltaCarta);

    
    function voltaCarta()
    {
      let selettore_questa_carta = "#"+this.id;          
      let selettore_prima_carta = "#"+id_prima_carta;

      
      if ($(selettore_questa_carta).attr("stato") === "indovinata"
          || selettore_prima_carta===selettore_questa_carta
      )
      {return;}
      
      
      $(selettore_questa_carta+">img").fadeToggle("slow").delay(500); 
      
      if (id_prima_carta==="nessuna") 
      {            
         
        id_prima_carta = this.id;
      }
      else 
      {           
        
        if ( $(selettore_questa_carta+">img").attr("src") ===
              $(selettore_prima_carta+">img").attr("src") )
        {
          
          $(selettore_questa_carta).attr("stato", "indovinata");
          $(selettore_prima_carta).attr("stato", "indovinata");

          
          id_prima_carta = "nessuna";

          conta_carte -= 2;
          if (conta_carte === 0)
          {
            $("#vittoria").css('visibility', 'visible');
          }


        }
        else             
        {
          
          $(selettore_prima_carta+">img").fadeToggle(1000).delay(1000);
          $(selettore_questa_carta+">img").fadeToggle(1000);

          $(selettore_questa_carta).attr("stato", "coperta"); 
          $(selettore_prima_carta).attr("stato", "coperta"); 

          id_prima_carta = "nessuna";
        }
      }
    }

     function crea_e_mischia_immagini()
    {
      for (let i=1; i<=8; i++)
      { 
        immagini.push("img"+i+".png");
        immagini.push("img"+i+".png");
      }

      
      for (let i=0; i<100; i++)
      {
        let pos_carta1 = Math.trunc( Math.random() * 16);
        let pos_carta2 = Math.trunc( Math.random() * 16);

        if (pos_carta1 !== pos_carta2)
            {
          let temp = immagini[pos_carta1];
          immagini[pos_carta1] = immagini[pos_carta2];
          immagini[pos_carta2] = temp;  
        }
      }

    }            
}

var count = 0;

$("#update").click(function() {
    count++;
    $("#counter").html("My current count is: "+count);
});


$(".box").click(function() {
    count += 1; 
    $("#clicks").html(+count);

});

(document).ready(function restart(){
    $("button").click("div>img".fadeToggle())
   
})

