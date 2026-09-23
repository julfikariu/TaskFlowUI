import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeleteDialog } from './project-delete-dialog';

describe('ProjectDeleteDialog', () => {
  let component: ProjectDeleteDialog;
  let fixture: ComponentFixture<ProjectDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
