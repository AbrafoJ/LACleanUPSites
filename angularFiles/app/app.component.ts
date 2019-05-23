import { Component, ViewChild,OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
export interface SiteInterface {
  streetnumber: string;
  streetname: string;
  zipcode: string;
}

const SITE_DATA: SiteInterface[] =[
 	{streetnumber:'10555' ,streetname:'W PICO BLVD' ,zipcode:'90064'},
        {streetnumber:'500' ,streetname:'N GARFIELD AVE' ,zipcode:'90640'},
        {streetnumber:'1630' ,streetname:'SANTA MONICA BLVD' ,zipcode:'90404'},
        {streetnumber:'1016' ,streetname:'N ALVARADO ST' ,zipcode:'90026'},
        {streetnumber:'811' ,streetname:'S SAN FERNANDO BLVD' ,zipcode:'91502'},
        {streetnumber:'14032' ,streetname:'S AVALON BLVD' ,zipcode:'90061'},
        {streetnumber:'404' ,streetname:'E COMMERCIAL ST' ,zipcode:'91767'},
        {streetnumber:'7916' ,streetname:'LONG BEACH BLVD' ,zipcode:'90280'},
        {streetnumber:'3241' ,streetname:'S BREA CANYON RD' ,zipcode:'91765'},
        {streetnumber:'316' ,streetname:'N JUANITA AVE' ,zipcode:'90004'},
        {streetnumber:'101' ,streetname:'W PACIFIC COAST HWY' ,zipcode:'90806'},
        {streetnumber:'2701' ,streetname:'W 3RD ST' ,zipcode:'90057'},
        {streetnumber:'3728' ,streetname:'ROCKWELL AVE' ,zipcode:'91731'},
        {streetnumber:'430' ,streetname:'E WEBER AVE' ,zipcode:'90222'},
        {streetnumber:'13528' ,streetname:'S WESTERN AVE' ,zipcode:'90249'},
        {streetnumber:'20200' ,streetname:'BLOOMFIELD AVE' ,zipcode:'90703'},
        {streetnumber:'20021' ,streetname:'VENTURA BLVD' ,zipcode:'91364'},
        {streetnumber:'1225' ,streetname:'W 196TH ST' ,zipcode:'90502'},
        {streetnumber:'1009' ,streetname:'CRENSHAW BLVD' ,zipcode:'90019'},
        {streetnumber:'9860' ,streetname:'LOWER AZUSA RD' ,zipcode:'91731'},
        {streetnumber:'13007' ,streetname:'TELEGRAPH RD' ,zipcode:'90670'},
        {streetnumber:'14201' ,streetname:'S HALLDALE AVE' ,zipcode:'90249'},
        {streetnumber:'797' ,streetname:'INDIAN HILL BLVD' ,zipcode:'91767'},
        {streetnumber:'3853' ,streetname:'E 3RD ST' ,zipcode:'90063'},
        {streetnumber:'13460' ,streetname:'VAN NUYS BLVD' ,zipcode:'91331'},
        {streetnumber:'22801' ,streetname:'VENTURA BLVD' ,zipcode:'91364'},
        {streetnumber:'400' ,streetname:'E ADAMS BLVD' ,zipcode:'90011'},
        {streetnumber:'6598' ,streetname:'CHERRY AVE' ,zipcode:'90805'},
        {streetnumber:'7155' ,streetname:'LINDLEY AVE' ,zipcode:'91335'},
        {streetnumber:'6800' ,streetname:'E WASHINGTON BLVD' ,zipcode:'90040'},
        {streetnumber:'2488' ,streetname:'S RESERVOIR ST' ,zipcode:'91766'},
        {streetnumber:'740' ,streetname:'CENTINELA AVE' ,zipcode:'90302'},
        {streetnumber:'3660' ,streetname:'S SOTO ST' ,zipcode:'90058'},
        {streetnumber:'2032' ,streetname:'E 220TH ST' ,zipcode:'90810'},
        {streetnumber:'14815' ,streetname:'RADBURN AVE' ,zipcode:'90670'},
        {streetnumber:'5500' ,streetname:'ATHERTON ST' ,zipcode:'90815'},
        {streetnumber:'4501' ,streetname:'W SLAUSON AVE' ,zipcode:'90043'},
        {streetnumber:'7810' ,streetname:'OTIS AVE' ,zipcode:'90201'},
        {streetnumber:'600' ,streetname:'S PARK AVE' ,zipcode:'91766'},
        {streetnumber:'2144' ,streetname:'W GAYLORD ST' ,zipcode:'90813'},
        {streetnumber:'2120' ,streetname:'LINCOLN BLVD' ,zipcode:'90405'},
        {streetnumber:'2741' ,streetname:'S TOWNE AVE' ,zipcode:'91766'},
        {streetnumber:'1930' ,streetname:'W 6TH ST' ,zipcode:'90057'},
        {streetnumber:'21119' ,streetname:'S WILMINGTON AVE' ,zipcode:'90810'},
        {streetnumber:'5971' ,streetname:'S MAIN ST' ,zipcode:'90003'},
        {streetnumber:'9650' ,streetname:'TELSTAR AVE' ,zipcode:'91731'},
        {streetnumber:'2845' ,streetname:'N TOWNE AVE' ,zipcode:'91767'},
        {streetnumber:'6033' ,streetname:'DE SOTO AVE' ,zipcode:'91367'}

];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
title = 'Site Table..';
displayedColumns: string[] = ['streetnumber', 'streetname', 'zipcode'];
dataSource = new MatTableDataSource(SITE_DATA);

logData(row){
	console.log(row)
}
applyFilter(filterValue: string){
	this.dataSource.filter= filterValue.trim().toLowerCase();
}
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

ngOnInit(){
this.dataSource.sort = this.sort;
this.dataSource.paginator = this.paginator;
}
}
