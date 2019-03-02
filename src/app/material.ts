import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';


@NgModule ({
    imports: [MatButtonToggleModule, MatIconModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
    exports: [MatButtonToggleModule, MatIconModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
})

export class MaterialModule {}
