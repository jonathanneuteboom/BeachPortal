import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-algemene-informatie',
  templateUrl: './algemene-informatie.component.html',
  styleUrls: ['./algemene-informatie.component.scss']
})
export class AlgemeneInformatieComponent implements OnInit {
  constructor(private userService: UserService, private documentService: DocumentService) {}

  isEditable = false
  isEditing = false
  content: string

  control: FormControl

  ngOnInit(): void {
    this.control = this.control ?? new FormControl()

    this.getAlgemeneInformatie()
    this.getCurrentUser()
  }

  getCurrentUser():void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.isEditable = user.is_staff
    })
  }

  getAlgemeneInformatie():void {
    this.documentService.getDocument().subscribe((content) => {
      this.content = content
      this.control.setValue(content)
    })
  }

  edit(): void {
    this.isEditing = !this.isEditing
  }

  save():void {
    const content = this.control.value
    this.documentService.updateDocument(content).subscribe(() => {
      this.isEditing = false

      this.getAlgemeneInformatie()
    })
  }
}
