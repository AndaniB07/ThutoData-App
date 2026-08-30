import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';

interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  definition: string;
  category: string;
}

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.page.html',
  styleUrls: ['./glossary.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    FooterComponent
  ]
})
export class GlossaryPage {

  searchTerm = '';

  selectedCategory = 'All';

  categories = [
    'All',
    'University Applications',
    'Qualifications',
    'Funding',
    'Testing'
  ];

  glossaryTerms: GlossaryTerm[] = [

    {
      term: 'Admission Points Score',
      abbreviation: 'APS',
      category: 'University Applications',
      definition:
        'A score calculated from your matric subject results. Universities use your APS to check whether you meet the requirements for a specific programme. APS is generally calculated using your Grade 12 subjects on a 1–7 scale. Life Orientation is normally excluded.'
    },

    {
      term: 'National Senior Certificate',
      abbreviation: 'NSC',
      category: 'Qualifications',
      definition:
        'Your matric certificate. It is the qualification you receive after successfully completing Grade 12.'
    },

    {
      term: 'NQF Level',
      abbreviation: 'NQF',
      category: 'Qualifications',
      definition:
        'The level of a qualification within the National Qualifications Framework. Different qualifications are placed at different NQF levels.'
    },

    {
      term: 'National Benchmark Test',
      abbreviation: 'NBT',
      category: 'Testing',
      definition:
        'Additional tests required by some universities or programmes. They assess areas such as academic literacy, quantitative literacy and mathematics.'
    },

    {
      term: 'Central Applications Office',
      abbreviation: 'CAO',
      category: 'University Applications',
      definition:
        'An organisation used to process applications for certain universities and colleges, particularly in KwaZulu-Natal.'
    },

    {
      term: 'National Student Financial Aid Scheme',
      abbreviation: 'NSFAS',
      category: 'Funding',
      definition:
        'A South African government funding scheme that provides financial assistance to eligible students who cannot afford to pay for their tertiary education.'
    },

    {
      term: 'Funza Lushaka',
      category: 'Funding',
      definition:
        'A government bursary programme designed to support students who want to study towards a teaching qualification.'
    },

    {
      term: 'Higher Education Qualifications Sub-Framework',
      abbreviation: 'HEQSF',
      category: 'Qualifications',
      definition:
        'A framework that provides the structure for higher education qualifications in South Africa and helps ensure that qualifications follow recognised standards.'
    },

    {
      term: 'Conditional Admission',
      category: 'University Applications',
      definition:
        'A provisional university admission based on information such as your Grade 11 results. Your final admission depends on meeting the required conditions using your final matric results.'
    }

  ];


  get filteredTerms(): GlossaryTerm[] {

    return this.glossaryTerms.filter(term => {

      const matchesCategory =
        this.selectedCategory === 'All' ||
        term.category === this.selectedCategory;

      const search =
        this.searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        term.term.toLowerCase().includes(search) ||
        term.abbreviation?.toLowerCase().includes(search) ||
        term.definition.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;

    });

  }


  selectCategory(category: string) {

    this.selectedCategory = category;

  }


  clearSearch() {

    this.searchTerm = '';

    this.selectedCategory = 'All';

  }

}