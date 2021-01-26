import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  singleSpaProps: SingleSpaProps;
  subscription:Subscription;
  message: string;

  constructor(private ChangeDetectorRef:ChangeDetectorRef){

  }


  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
        console.log(props);
        this.watchEvents();
      }
    );
    
}

watchEvents(){
  this.singleSpaProps['EventBus'].on('demo-app-event',(data)=>{
   // alert(`message from DEMO APP - ${data.name}`);
   this.message = data.name;
   this.ChangeDetectorRef.detectChanges();
  });
}

sendEvent(){
  this.singleSpaProps['EventBus'].emit({name:'my-app-event',data: {name: "MyAPP is better"}});
 }

}
