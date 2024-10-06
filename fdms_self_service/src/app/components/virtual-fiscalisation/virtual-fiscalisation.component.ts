import { Component,OnInit,ViewChild} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { NgForOf, NgIf } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms'; // Add this line
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { CloseDayServiceService } from 'src/app/services/close-day-service.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DocumentsAiServiceService } from 'src/app/services/documents-ai-service.service';
import { VirtualFiscaServiceService } from 'src/app/services/virtual-fisca-service.service';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';
@Component({
  selector: 'virtual-fiscalisation',
  standalone: true,
 
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgIf,
    NgForOf,
    NgxDropzoneModule,
    MatCheckboxModule,
    LocationSelectorComponent
    //FormGroup,
    // MatSnackBar
  
  ],

  templateUrl: './virtual-fiscalisation.component.html',
  styleUrl: './virtual-fiscalisation.component.scss'
})
export class VirtualFiscalisationComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  registerCompanyForm: FormGroup; // Declare the registerCompanyForm FormGroup
  companyName: string; // The company name
  loading = false;
  isCompanyValid:boolean =false;
  fileUploaded: boolean = false; // Track if the file is uploaded
  errorMessages: string[] = [];
  taxClearanceFiles: any[] = [];
  capturedFields: { invoice: {} | undefined; creditNote: {} | undefined } = {
    invoice: undefined,
    creditNote: undefined
  };
  data: any;

  constructor(private formBuilder: FormBuilder,
    private docsAiService: DocumentsAiServiceService,
    private virtualFiscaService: VirtualFiscaServiceService,
    private http:HttpClient,
    private closeDayService: CloseDayServiceService
  ) { }

  ngOnInit() {
    this.registerCompanyForm = this.formBuilder.group({

      email: ['', Validators.required], // Define the form control 'email'
      companyName: ['', Validators.required],//Define the form control 'companyName'
      taxPayerName: ['', Validators.required],//Define the form control 'taxPayerName'
      tradeName: ['', Validators.required],//define the form control 'tradeName',
      companyTin: ['', Validators.required],//Define the form control 'companyTin,
      companyVat: ['', Validators.required],//Define the form control 'companyVat,
      companyPhoneNumber: ['', Validators.required],//Define the form control 'companyVat',
      companyEmail: ['', Validators.required],//Define the form control 'companyEmail,
      houseNo: ['', Validators.required],//define the form control 'houseNo 
      streetName: ['', Validators.required],//define the form control 'street',
      city: ['', Validators.required],//define the form control 'city',
      province:['', Validators.required],//define the form control 'province,

      serialNumber: [''],//define the form control 'serialNumber,
      deviceId: [''],//define the form control 'deviceId,
      deviceModel: ['', Validators.required],//define the form control 'deviceModel

    });

        // Set up value changes for all relevant fields
        this.setupValueChangeListener('companyName');
        this.setupValueChangeListener('taxPayerName');
  }

  updateSelectedProvince(province: string) {
    this.registerCompanyForm.patchValue({ province }); // Update province in the form

    console.log(this.registerCompanyForm.get('province')?.value)
  }

  updateSelectedCity(city: string) {
    this.registerCompanyForm.patchValue({ city }); // Update city in the form
  }
  onSelect(event: any, type: string): void {
    //@ts-expect-error
    this[`${type}Files`].push(...event.addedFiles);
  }

  async onFileSelected(event: any, type: string) {
    this.loading = true;
    this.errorMessages = []; // Clear error messagesro
    this.onSelect(event, type);
    console.log(event);
    const file: File = event.addedFiles[0];

    console.log(file);

    if (file) {
      const base64String: string = await this.encodeFileInBase64(file);
      this.data = await this.virtualFiscaService
        .uploadRequestFile({ doc: base64String })
        .toPromise();

      console.log(this.data);

      const data1 = this.data;


      this.loading = false;
      this.fileUploaded=true;

      //end of the conversion
      let mentions = this.mapMentions(data1?.document?.entities);

   console.log(mentions)
   if (Number(mentions['tinNumber'])!==this.registerCompanyForm.get('companyTin')?.value){
    this.errorMessages.push('Enter correct TIN Number');
   }
   if (Number(mentions['vat'])!==this.registerCompanyForm.get('companyVat')?.value){
    this.errorMessages.push('Enter correct VAT Number');
   }

  //  if (mentions['regTradeName']!==this.registerCompanyForm.get('taxPayerName')?.value){
  //   this.errorMessages.push('Enter correct Taxpayer Name');
  //  }

if(this.errorMessages.length===0){
  this.isCompanyValid=true;
}
console.log(this.errorMessages)

    }
  }


  onRemove(event: any, type: string): void {
    //@ts-expect-error
    this[`${type}Files`].splice(this[`${type}Files`].indexOf(event), 1);
    this.fileUploaded=true;
    this.isCompanyValid=false;

  }
  mapMentions(mentions: Mention[]): { [key: string]: string } {
    const mappedMentions: { [key: string]: string } = {};
    mentions.forEach((mention) => {
      mappedMentions[mention.type] = mention.mentionText;
    });
    return mappedMentions;
  }

  //capitalizing the words of the text

   capitalizeWord = (str:string)=>{
    const firstChar = str.charAt(0).toLocaleUpperCase()
    const restofStr = str.substring(1).toLocaleLowerCase()

    return `${firstChar}${restofStr}`
  }
  capitalizeEachWord = (str:string) => (
    str.split(' ').map((word:string) => this.capitalizeWord(word)).join(' ')
  )

  setupValueChangeListener(controlName: string) {
    this.registerCompanyForm.get(controlName)?.valueChanges.subscribe(value => {
      this.updateControlValue(controlName, value);
    });
  }

  updateControlValue(controlName: string, value: string) {
    const capitalizedValue = this.capitalizeEachWord(value);
    this.registerCompanyForm.get(controlName)?.setValue(capitalizedValue, { emitEvent: false });
      // Log the updated value
      console.log(`${controlName} updated to:`, capitalizedValue);
  }
 


  private async encodeFileInBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result: string | ArrayBuffer | null = reader.result;
        if (typeof result === 'string') {
          const base64String = result.split(',')[1]; // Extract the base64 portion
          resolve(base64String);
        } else {
          reject(new Error('Invalid result type'));
        }
      };

      // Read the file as Data URL, which will be in base64 format
      reader.readAsDataURL(file);
    });
  }

  

  onSubmit(){
    this.loading = true;
    if(this.registerCompanyForm.invalid){
      return;
    }

    const formData = this.registerCompanyForm.value;

    console.log("formdata",formData)


    this.virtualFiscaService.registerCompany(formData).subscribe(
      response => {
        console.log('Success', response);
        setTimeout(() => {
          // Upon response completion
          this.loading = false;
          this.stepper.selectedIndex = this.stepper.steps.length - 1;

      

        }, 1000); // Simulating a 2-second delay
      },
    
    );


  }
}

interface Mention {
  mentionText: string;
  type: string;
}
