import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Detalhe } from './detalhe';

describe('Detalhe', () => {
  let component: Detalhe;
  let fixture: ComponentFixture<Detalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detalhe],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Detalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
