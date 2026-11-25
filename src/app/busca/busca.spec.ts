import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Busca } from './busca';

describe('Busca', () => {
  let component: Busca;
  let fixture: ComponentFixture<Busca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busca],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Busca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
