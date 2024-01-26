import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'logout',
        icon: 'home',
        label: 'Dashboard'
    },
    {
        routeLink: 'keyresult',
        icon: 'alarm_on',
        label: 'Task'
    },
    {
        routeLink: 'hierarchy',
        icon: 'tags',
        label: 'Hierarchy'
    },
    {
        routeLink: 'team',
        icon: 'people',
        label: 'Review Team'
    },
    {
        routeLink: 'feedback',
        icon: 'feedback',
        label: 'Feedbacks'
    },
    {
        routeLink: 'admin',
        icon: 'supervised_user_circle',
        label: 'Admin',
        items: [
            {
                routeLink: '/admin/user',
                label: 'User Registration',
            },
            {
                routeLink: '/admin/goalplan',
                label: 'Goalplan Management',
            },
            {
                routeLink: '/admin/keyresult',
                label: 'Keyresult Management',
            },
            {
                routeLink: '/admin/task',
                label: 'Task Management',
            },
            {
                routeLink: 'admin/reviewcycle',
                label: 'Review Cycle Management',
            },
            {
                routeLink: 'admin/feedback',
                label: 'View Employee Feedback',
            }
        ]
        }
];