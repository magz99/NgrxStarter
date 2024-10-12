import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { getUserTableRows } from "../../user-view.helpers";

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnInit {
    tableHeaderKeys: string[] = [];
    readonly getUserTableRows = getUserTableRows;
    readonly editLabel = 'Edit';
    readonly editAriaLabel = 'Edit row: ';
    readonly saveLabel = 'Save';
    readonly saveAriaLabel = 'Save row changes for row:';

    @Input() tableForm?: FormGroup;
    @Input() tableHeaders!: Record<string,string>;
    @Output() rowModified: EventEmitter<number> = new EventEmitter<number>()
    @Output() toggleEdit: EventEmitter<number> = new EventEmitter<number>();
    
    ngOnInit(): void {
        this.tableHeaderKeys = Object.keys(this.tableHeaders)
    }
    
    saveRow(index: number): void {
    this.rowModified.emit(index);
    }

    editRow(index: number): void {
    this.toggleEdit.emit(index);
    }
}