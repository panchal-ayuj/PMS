import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, Diagram, NodeModel, ConnectorModel, SnapSettingsModel, LayoutModel, DataSourceModel, TextModel, DecoratorModel, ShapeStyleModel } from '@syncfusion/ej2-angular-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Node } from '../node.model';
import { OrgchartModule } from '@dabeng/ng-orgchart';
import { map, mergeMap } from "rxjs/operators";
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrl: './hierarchy.component.scss'
})
export class HierarchyComponent {
  selectedNodes!: TreeNode[];

  data: TreeNode[] = [
      {
          expanded: true,
          type: 'person',
          data: {
             // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
              name: 'Avi Baraswal',
              band: 'B4'
          },
          
            
          
          children: [
              {
                  expanded: true,
                  type: 'person',
                  data: {
                     // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Partha Sarathy Baytha',
                      band: 'B5'
                  },
                  children: [
                      {
                        expanded: true,
                        type: 'person',
                        data: {
                     // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Ganesh P Raigond',
                      band: 'B7',
                     
                  },
                      },
                      {
                        expanded: true,
                        type: 'person',
                        data: {
                     // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Ayuj Panchal',
                      band: 'B7'
                  },
                      },
                      {
                        expanded: true,
                        type: 'person',
                        data: {
                     // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Preety Rani Priya',
                      band: 'B7'
                  },
                      },
                      {
                        expanded: true,
                        type: 'person',
                        data: {
                     // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Sarthak',
                      band: 'B7'
                  },
                      },
                      {
                        expanded: true,
                        type: 'person',
                        data: {
                     // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Sahil',
                      band: 'B7'
                  },
                      }
              
                  ]
              },
              
          ]
      }
  ];

}
