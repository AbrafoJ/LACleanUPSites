import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatButtonToggleModule,
	 MatIconModule,
	 MatProgressSpinnerModule,
	 MatToolbarModule,
	 MatTableModule,
	 MatSortModule,
	 MatInputModule,
	 MatPaginatorModule} from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material';

const material		 = [ MatButtonModule,
			     MatButtonToggleModule,
			     MatIconModule,
			     MatBadgeModule,
			     MatProgressSpinnerModule,
			     MatToolbarModule,
			     MatTableModule,
			     MatSortModule,
			     MatFormFieldModule,
			     MatInputModule,
			     MatPaginatorModule
			   ]
@NgModule({
  imports: [
    material
    ],
  exports: [
    	material
    ]
})
export class MaterialModule { }
