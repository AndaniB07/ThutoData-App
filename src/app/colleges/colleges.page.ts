import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterLink } from '@angular/router';

interface College {
  name: string;
  province: string;
  location: string;
  description: string;
  type: string;
}

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './colleges.page.html',
  styleUrls: ['./colleges.page.scss']
})
export class CollegesPage {

  searchTerm = '';

  selectedProvince = 'All Provinces';
  selectedType = 'All Types';

  provinces = [
    'All Provinces',
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ];

  types = [
    'All Types',
    'TVET College'
  ];

  /*
   * TEMPORARY DATA
   * -----------------------------------------
   * This will later be replaced by data
   * received from our API/database.
   */

  colleges: College[] = [

    {
      name: 'Tshwane South TVET College',
      province: 'Gauteng',
      location: 'Pretoria, Gauteng',
      type: 'TVET College',
      description:
        'A public TVET college offering vocational and occupational programmes designed to provide students with practical skills for the workplace.'
    },

    {
      name: 'Motheo TVET College',
      province: 'Free State',
      location: 'Bloemfontein, Free State',
      type: 'TVET College',
      description:
        'A public TVET college providing students with technical, vocational and occupational education and training.'
    },

    {
      name: 'Coastal KZN TVET College',
      province: 'KwaZulu-Natal',
      location: 'Durban, KwaZulu-Natal',
      type: 'TVET College',
      description:
        'A public TVET college offering a range of vocational and occupational programmes across campuses in KwaZulu-Natal.'
    },

    {
      name: 'Umfolozi TVET College',
      province: 'KwaZulu-Natal',
      location: 'Richards Bay, KwaZulu-Natal',
      type: 'TVET College',
      description:
        'A public college providing technical and vocational education and training to students in northern KwaZulu-Natal.'
    },

    {
      name: 'Vhembe TVET College',
      province: 'Limpopo',
      location: 'Venda, Limpopo',
      type: 'TVET College',
      description:
        'A public TVET college offering vocational and occupational programmes to students in Limpopo.'
    },

    {
      name: 'Waterberg TVET College',
      province: 'Limpopo',
      location: 'Mokopane, Limpopo',
      type: 'TVET College',
      description:
        'A public TVET college providing students with technical and vocational skills for further study and employment.'
    },

    {
      name: 'Ekurhuleni West TVET College',
      province: 'Gauteng',
      location: 'Germiston, Gauteng',
      type: 'TVET College',
      description:
        'A public TVET college offering vocational and occupational programmes across several campuses in Gauteng.'
    },

    {
      name: 'Nkangala TVET College',
      province: 'Mpumalanga',
      location: 'Emalahleni, Mpumalanga',
      type: 'TVET College',
      description:
        'A public TVET college offering technical and vocational education and training in Mpumalanga.'
    },

    {
      name: 'King Hintsa TVET College',
      province: 'Eastern Cape',
      location: 'Eastern Cape',
      type: 'TVET College',
      description:
        'A public TVET college providing vocational and occupational training to students in the Eastern Cape.'
    }

  ];


  get filteredColleges(): College[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.colleges.filter(college => {

      const matchesSearch =
        !search ||
        college.name.toLowerCase().includes(search) ||
        college.province.toLowerCase().includes(search) ||
        college.location.toLowerCase().includes(search) ||
        college.description.toLowerCase().includes(search);

      const matchesProvince =
        this.selectedProvince === 'All Provinces' ||
        college.province === this.selectedProvince;

      const matchesType =
        this.selectedType === 'All Types' ||
        college.type === this.selectedType;

      return (
        matchesSearch &&
        matchesProvince &&
        matchesType
      );

    });

  }


  clearFilters(): void {

    this.searchTerm = '';

    this.selectedProvince = 'All Provinces';

    this.selectedType = 'All Types';

  }

}