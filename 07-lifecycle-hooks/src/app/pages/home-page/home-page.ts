import { Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/title.component/title.component';

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.html',
})
export class HomePage {
  traditionalProperty = 'Michael';
  signalProperty = signal('Michael');

  constructor() {
    console.log('Creación del componente (Creation) \n \nConstructor llamado! \nConstructor de clase estándar de JavaScript. Se ejecuta cuando Angular crea una instancia del componente.');
  }

  changeTraditional() {
    this.traditionalProperty = 'Michael Núñez';
  }

  changeSignal() {
    this.signalProperty.set('Michael Núñez');
  }

  //* Detección (Detection del componente)
  ngOnInit() {
    console.log('\nngOnInit\n \nSe ejecuta una vez después de que Angular haya inicializado todas las entradas de los componentes.');
  }

  ngOnChanges() {
    console.log('\nngOnChanges\n \nSe ejecuta cada vez que cambian las entradas de los componentes.');
  }

  ngDoCheck() {
    console.log('\nngDoCheck\n \nSe ejecuta cada vez que se comprueba si este componente ha sufrido cambios.');
  }

  basicEffect = effect((onCleanup) => {
    console.log('\neffect\n \nDispara efectos secundarios tan pronto el componente sea inicializado');

    onCleanup(() => {
      console.log('\nonCleanup\n \nSe ejecuta cuando el efecto se destruye.');
    });
  });

  ngAfterContentInit() {
    console.log('\nngAfterContentInit\n \nSe ejecuta una vez después de que se haya inicializado el contenido del componente.');
  }

  ngAfterContentChecked() {
    console.log('\nngAfterContentChecked\n \nSe ejecuta cada vez que se comprueba si hay cambios en el contenido de este componente.');
  }

  ngAfterViewInit() {
    console.log('\nngAfterViewInit\n \nSe ejecuta una vez después de que se haya inicializado la vista del componente.');
  }

  ngAfterViewChecked() {
    console.log('\nngAfterViewChecked\n \nSe ejecuta cada vez que se comprueba si hay cambios en la vista de componentes.');
  }

  //* Rendering (Renderizado del componente)
  afterNextRender() {
    console.log('\nafterNextRender\n \nSe ejecuta una vez más la próxima vez que todos los componentes se hayan renderizado en el DOM.');
  }

  afterEveryRender() {
    console.log('\nafterEveryRender\n \nSe ejecuta cada vez que todos los componentes se han renderizado en el DOM.');
  }

  //* Destruction (Destrucción del componente)
  ngOnDestroy() {
    console.log('\nngOnDestroy\n \nSe ejecuta una vez antes de que el componente sea destruido.');
  }
}