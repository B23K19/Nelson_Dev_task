import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-form',
  standalone: false,
  templateUrl: './test-form.html',
  styleUrl: './test-form.css'
})
export class TestForm {
  testForm: FormGroup;
  response: any = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.testForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      url: [''],
      data: ['']
    });
  }

  submit() {
    this.response = null;
    this.error = null;

    const { url, data } = this.testForm.value;
    const body = { data };

    this.http.post(url, body).subscribe({
      next: res => this.response = res,
      error: err => this.error = err.error?.error || 'Unknown error'
    });
  }
  get wordRespond(): string {
    if (!this.response?.word) return '';
    return JSON.stringify({ word: this.response.word }); 
  }

}
