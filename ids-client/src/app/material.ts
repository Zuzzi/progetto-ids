import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
@NgModule ({
    // tslint:disable-next-line:max-line-length
    imports: [MatButtonToggleModule, MatIconModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatButtonModule, MatTableModule],
    // tslint:disable-next-line:max-line-length
    exports: [MatButtonToggleModule, MatIconModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatButtonModule, MatTableModule],
})

export class MaterialModule {}
