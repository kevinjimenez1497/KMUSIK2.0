import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit{

  slideOpt = {
    initialSlide: 0, //slide inicial
    slidesPerView: 1, //slide por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de casa slide en milisegundo
  }

  slides = [
    {
      title: "BIENVENIDOS A KMUSIK",
      subtitle: "Tu app confiabel de musica",
      img: "assets/images/Icono.png",
      description: "LA APLICACION NUMERO 1 EN LATINOAMERICA"
    },
    {
      title: "Artistas",
      subtitle: "Podras disfrutar de tus artistas favoritos",
      img: "assets/images/Slade 2.png",
      description: "Michael jackson, the beatles, eminem, linkin park, y muchos artistas mas"
    },
    {
      title: "Solo",
      subtitle: "Podras disfrutar de modo de uso solo para ti",
      icon: "play-outline",
      img: "assets/images/Escuchando solo.jpg",
      description: "Ideal para esas horas de estudio, meditacion o concentracion"
    },
    {
      title: "Con tus amigos",
      subtitle: "Tambien escuchar en tiempo real con tus amigos",
      img: "assets/images/Escuchando acompañado.jpg",
      description: "Con este modo podras escuchar en tiempo real y compartir tu lista con tus amigos"
    }
  ]

  constructor(private router: Router, private storage: Storage) { 
    this.storage.create();
  }

  ngOnInit(): void {
  
  }


  finish() {
    this.storage.set("isIntroShowed", true);
    this.router.navigateByUrl("/login");
  }

}
