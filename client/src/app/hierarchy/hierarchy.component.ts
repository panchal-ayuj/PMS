import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  DiagramComponent,
  Diagram,
  NodeModel,
  ConnectorModel,
  SnapSettingsModel,
  LayoutModel,
  DataSourceModel,
  TextModel,
  DecoratorModel,
  ShapeStyleModel,
} from '@syncfusion/ej2-angular-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Node } from '../node.model';
import { map, mergeMap } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { UserService } from '../user.service';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrl: './hierarchy.component.scss',
})
export class HierarchyComponent {
  //   selectedNodes!: TreeNode[];

  // data: TreeNode[] = [
  //     {
  //         expanded: true,
  //         type: 'person',
  //         data: {
  //            // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
  //             name: 'Avi Baraswal',
  //             band: 'B4'
  //         },

  //         children: [
  //             {
  //                 expanded: true,
  //                 type: 'person',
  //                 data: {
  //                    // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
  //                     name: 'Partha Sarathy Baytha',
  //                     band: 'B5'
  //                 },
  //                 children: [
  //                     {
  //                       expanded: true,
  //                       type: 'person',
  //                       data: {
  //                    // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
  //                     name: 'Ganesh P Raigond',
  //                     band: 'B7',

  //                 },
  //                     },
  //                     {
  //                       expanded: true,
  //                       type: 'person',
  //                       data: {
  //                    // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
  //                     name: 'Ayuj Panchal',
  //                     band: 'B7'
  //                 },
  //                     },
  //                     {
  //                       expanded: true,
  //                       type: 'person',
  //                       data: {
  //                    // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
  //                     name: 'Preety Rani Priya',
  //                     band: 'B7'
  //                 },
  //                     },
  //                     {
  //                       expanded: true,
  //                       type: 'person',
  //                       data: {
  //                    // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
  //                     name: 'Sarthak',
  //                     band: 'B7'
  //                 },
  //                     },
  //                     {
  //                       expanded: true,
  //                       type: 'person',
  //                       data: {
  //                    // image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
  //                     name: 'Sahil',
  //                     band: 'B7'
  //                 },
  //                     }

  //                 ]
  //             },

  //         ]
  //     }
  // ];
  selectedNodes!: TreeNode[];
  data: TreeNode[] = [];
  userId: any;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private userService: UserService,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.handleAsyncResponse()
      .then(() => {
        this.loadEmployeeHierarchy(this.userId);
      })
      .catch((error) => {
        console.error('Error handling async response:', error);
      });
  }

  loadEmployeeHierarchy(userId: number) {
    this.employeeService.getUsersAndReportingChain(userId).subscribe(
      (userReportingChainMap) => {
        this.data = this.mapTreeNode(userReportingChainMap);
      },
      (error) => {
        console.error('Error fetching employee hierarchy:', error);
      }
    );
  }

  async handleAsyncResponse() {
    try {
      // Assume this is an asynchronous method that returns a Promise
      const user = await this.authService
        .getUser(localStorage.getItem('token'))
        .toPromise();
      console.log(user);

      this.userId = user.userId;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  mapTreeNode(userReportingChainMap: { [key: string]: { [key: string]: { [key: string]: string[] } }}): TreeNode[] {
    const mappedTreeNodes: TreeNode[] = [];
    // console.log(userReportingChainMap);
  
    // Use Object.keys() to iterate over the keys of the object
    Object.keys(userReportingChainMap).forEach((managerFirstName) => {
      const directReportFirstNames = userReportingChainMap[managerFirstName];

      this.userService.getUserById(managerFirstName).subscribe(
        (data) => {
          console.log("got data!!!");
          console.log(data);
          const managerNode: TreeNode = {
            expanded: true,
            type: 'person',
            data: {
              name: data.firstName + ' ' + data.lastName,
              band: data.band,
              userId: data.userId, // You can modify this based on your requirements
            },
            children: this.mapToTreeNode(directReportFirstNames),
          };
      
          mappedTreeNodes.push(managerNode);
        },
        (error) => {
          console.error('Error fetching team members:', error);
        }
      );

    });
    console.log(mappedTreeNodes);
    return mappedTreeNodes;
  }

  mapToTreeNode(userReportingChainMap: { [key: string]: { [key: string]: string[] } }): TreeNode[] {
    const mappedTreeNodes: TreeNode[] = [];
    console.log(userReportingChainMap);
  
    // Use Object.keys() to iterate over the keys of the object
    Object.keys(userReportingChainMap).forEach((managerFirstName) => {
      const directReportFirstNames = userReportingChainMap[managerFirstName];
  
      this.userService.getUserById(managerFirstName).subscribe(
        (data) => {
          console.log("got data!!!");
          console.log(data);
          const managerNode: TreeNode = {
            expanded: true,
            type: 'person',
            data: {
              name: data.firstName + ' ' + data.lastName,
              band: data.band,
              userId: data.userId, // You can modify this based on your requirements
            },
            children: this.mapToTreeNodes(directReportFirstNames),
          };
      
          mappedTreeNodes.push(managerNode);
        },
        (error) => {
          console.error('Error fetching team members:', error);
        }
      );
    });
    console.log(mappedTreeNodes);
    return mappedTreeNodes;
  }

mapToTreeNodes(userReportingChainMap: { [key: string]: string[] }): TreeNode[] {
    const mappedTreeNodes: TreeNode[] = [];
    console.log(userReportingChainMap);

    // Use Object.keys() to iterate over the keys of the object
    Object.keys(userReportingChainMap).forEach((managerFirstName) => {
      const directReportFirstNames = userReportingChainMap[managerFirstName];

      this.userService.getUserById(managerFirstName).subscribe(
        (data) => {
          console.log("got data!!!");
          console.log(data);
          const managerNode: TreeNode = {
            expanded: true,
            type: 'person',
            data: {
              name: data.firstName + ' ' + data.lastName,
              band: data.band,
              userId: data.userId, // You can modify this based on your requirements
            },
            children: this.mapToTreeNodesRecursive(directReportFirstNames),
          };
      
          mappedTreeNodes.push(managerNode);
        },
        (error) => {
          console.error('Error fetching team members:', error);
        }
      );
    });
    console.log(mappedTreeNodes);
    return mappedTreeNodes;
  }
  
  mapToTreeNodesRecursive(userIds: string[]): TreeNode[] {
    const mappedTreeNodes: TreeNode[] = [];

    // Use the userService to fetch user details for each userId
    userIds.forEach((userId) => {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          console.log('got data!!!');
          console.log(data);
          const userNode: TreeNode = {
            expanded: true,
            type: 'person',
            data: {
              name: data.firstName + ' ' + data.lastName,
              band: data.band,
              userId: data.userId, // You can modify this based on your requirements
            },
            children: [], // Assuming there are no children for direct reports
          };
  
          mappedTreeNodes.push(userNode);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    });
  
    console.log(mappedTreeNodes);
    return mappedTreeNodes;
  }

  viewDetails(userId: any): void {
    this.sharedDataService.changeUserId(userId);
    if(userId !== null && userId !== undefined && userId !== ""){
      console.log("Hitting profile");
      this.router.navigate(['/profile']);
    } else {
      console.log("Empty user id");
    }
  }
}
