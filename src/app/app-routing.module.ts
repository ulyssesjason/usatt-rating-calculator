import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CalculatorComponent} from './calculator/calculator.component';

const routes: Routes = [
  {path: 'usatt_rating_calculator', component: CalculatorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
