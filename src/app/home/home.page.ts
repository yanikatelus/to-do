import { Component, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public todos = ['Submit Project 3', 'Study Angular docs', 'Review Ionic components'];

  constructor( public alertController: AlertController, private _ngZone: NgZone ) {}

     async presentAddNewPrompt() {
        console.log('It works so far!');
        const addTodoAlert = await this.alertController.create(
            {
                header: 'Add a Todo',
                message: 'Enter your todo',
                inputs: [
                    {
                        type: 'text',
                        name: 'newTodoItem',
                        placeholder: 'New Item'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'OK',
                        handler: (inputData) => {
                            let todo;
                            if (inputData.newTodoItem) {
                                todo = inputData.newTodoItem.trim();
                                if (todo !== '') {
                                    // Why are we wrapping this into NgZone.run function?
                                    this._ngZone.run(() => {
                                        this.todos.push(todo);
                                    });
                                } else {
                                    console.log('The input string is empty.');
                                }
                            } else {
                                console.log('The input string is not set.');
                            }
                            return todo;
                        }
                    }
                ]
            });
        await addTodoAlert.present();
    }

    removeTodo(todo: string){
      console.log("todo = "+todo);
      let index = this.todos.indexOf(todo);
      console.log("index of = "+index);
      this.todos.splice(index,1);
    }

}