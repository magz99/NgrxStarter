import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { UserData } from "../../models/user-table.model";

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
    tableHeaderKeys: string[] = [];
    readonly editLabel = 'Edit';
    readonly editAriaLabel = 'Edit the row';
    readonly saveLabel = 'Save';
    readonly saveAriaLabel = 'Save row changes';

    @Input() tableForm!: FormGroup;
    @Input() tableHeaders!: Record<string,string>;
    @Output() rowModified: EventEmitter<number> = new EventEmitter<number>()
    @Output() toggleEdit: EventEmitter<{rowId: number; value: boolean}> = new EventEmitter<{rowId: number; value: boolean}>();
    
    ngOnInit(): void {
        this.tableHeaderKeys = Object.keys(this.tableHeaders)
    }


    get userTableRows(): FormArray<FormGroup<UserData>> {
        return this.tableForm.get('userTableRows') as FormArray
      }
    
    saveRow(index: number): void {
    this.rowModified.emit(index);
    }

    editRow(index: number, value: boolean): void {
    this.toggleEdit.emit({rowId: index,value});
    }
}