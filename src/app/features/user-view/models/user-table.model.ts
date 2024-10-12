import { FormControl } from "@angular/forms";

export interface UserRowData {
    id: FormControl<string>;
    name: FormControl<string>;
    username:  FormControl<string>;
    email: FormControl<string>;
    
    isEditing: FormControl<boolean>;
}
