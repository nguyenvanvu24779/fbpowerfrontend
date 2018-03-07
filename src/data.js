import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import VideoLibrary from 'material-ui/svg-icons/av/video-library';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import GroupWork from 'material-ui/svg-icons/action/group-work';
import SettingBrightness from 'material-ui/svg-icons/action/settings-brightness';
import Schedule from 'material-ui/svg-icons/action/schedule';
import {cyan600, pink600, purple600} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  menus: [
    { text: 'DashBoard', icon: <Assessment/>, link: '/dashboard' },
    //{ text: 'Form Page', icon: <Web/>, link: '/form' },
    //{ text: 'Table Page', icon: <GridOn/>, link: '/table' },
    { text: 'Login Page', icon: <PermIdentity/>, link: '/login' },
    { text: 'Stream Video', icon: <VideoLibrary/>, link: '/stream' },
    { text: 'Content Share Mngt', icon: <Web/>, link: '/contentShareMngt' },
    { text: 'Account FB Mngt', icon: <AccountBox/>, link: '/accountFbMngt' },
    { text: 'User Mngt', icon: <AccountBox/>, link: '/userMngt' },
    { text: 'Group Mngt', icon: <GroupWork/>, link: '/groupMngt' },
    { text: 'Setting Mngt', icon: <SettingBrightness/>, link: '/settingMngt' },
    { text: 'Schedule Job', icon: <Schedule/>, link: '/scheduleJob' },
    { text: 'Node Mngt', icon: <Web/>, link: '/nodeMngt' },
   
  ],
  menusUser: [
    { text: 'DashBoard', icon: <Assessment/>, link: '/dashboard' },
    { text: 'Login Page', icon: <PermIdentity/>, link: '/login' },
    { text: 'Stream Video', icon: <VideoLibrary/>, link: '/stream' },
  ],
  tablePage: {
    items: [
      {id: 1, name: 'Product 1', price: '$50.00', category: 'Category 1'},
      {id: 2, name: 'Product 2', price: '$150.00', category: 'Category 2'},
      {id: 3, name: 'Product 3', price: '$250.00', category: 'Category 3'},
      {id: 4, name: 'Product 4', price: '$70.00', category: 'Category 4'},
      {id: 5, name: 'Product 5', price: '$450.00', category: 'Category 5'},
      {id: 6, name: 'Product 6', price: '$950.00', category: 'Category 6'},
      {id: 7, name: 'Product 7', price: '$550.00', category: 'Category 7'},
      {id: 8, name: 'Product 8', price: '$750.00', category: 'Category 8'}
    ]
  },
  streamVideoPage: {
    items: [
      {id: '1988198441503862', url: 'https://www.facebook.com/80Mpage/videos/1988198441503862/', credit: '$50.00', share: 10,botShare : 7, live : true, status : 1},
      {id: '1988198441503863', url: 'https://www.facebook.com/80Mpage/videos/1988198441503862/', credit: '$50.00', share: 10, botShare : 6,live : false, status : 2},
    ]
  },
  accountFacceBookPage: {
    items: [
      {id: '1988198441503862', birthDay  : '01/01/2001', sex: 'Male', groups: 20,from : 'Hanoi, VietNam', name : 'Vu Nguyen', email: 'aa@aa.com',status : 1},
      {id: '1988198441503863', birthDay : '01/01/2001' , sex: 'Female', groups: 10, from : 'Hcm, VietNam',name  : 'Key ss', email : 'sss@ss.com' ,status : 2},
    ]
  },
  scheduleJobPage: {
    items: [
      {id: '1988198441503862', jobName  : 'join groups', startTime: '', endTime : '',  message : 'log > sss', status : 'Running', loopTime : '6 hours'},
      {id: '1988198441503863', jobName  : 'join groups', startTime: '', endTime  : '',  message : 'log > sss', status : 'Running', loopTime : '6 hours'},
      {id: '1988198441503864', jobName  : 'join groups', startTime: '', endTime : '',  message : 'log > sss', status : 'Running', loopTime : '6 hours'},
      {id: '1988198441503865', jobName  : 'join groups', startTime:'', endTime : '',  message : 'log > sss', status : 'Running', loopTime : '6 hours'},
    ]
  },
  groupShare : {
    items : [
      {
          "message": "nodejs http post fb nguyễn văn vũ video attach - ssss",
          "story": "Van On Ho shared a live video to the group: dev fb.",
          "created_time": "2017-11-16T11:36:32+0000",
          "id": "141275386523052_141122219871702"
      },
      {
          "message": "nodejs http post fb nguyễn văn vũ video attach",
          "story": "Van On Ho shared a live video to the group: dev fb.",
          "created_time": "2017-11-16T10:54:36+0000",
          "id": "141275386523052_141111059872818"
      }
    ]
    
  },
  
  groupPage: {
    items: [
      {id: 1547184938658515, name: 'dev fb', url: 'https://www.facebook.com/groups/1547184938658515/', botsInGroup: 50, botShares : 25},
      {id: 1547184938658516, name: 'dev fb', url: 'https://www.facebook.com/groups/1547184938658515/', botsInGroup: 100, botShares : 25},
    ]
  },
  
  settingPage : {
    items: [
        {id: 1547184938658515, key: 'access_token', value: 'sss',  role : 1},
      ]
  },
  
  contentShareManagementPage : {
    items: [
        {id: 1547184938658515, content: 'content 1.....'},
        {id: 1547184938658516, content: 'content 2.....'},
        {id: 1547184938658517, content: 'content 3.....'},
        {id: 1547184938658518, content: 'content 4.....'},
        {id: 1547184938658519, content: 'content 5.....'},
      ]
  },
  
  dashBoardPage: {
    recentProducts: [
      {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
      {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
      {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
      {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ],
    monthlySales: [
      {name: 'Jan', uv: 3700},
      {name: 'Feb', uv: 3000},
      {name: 'Mar', uv: 2000},
      {name: 'Apr', uv: 2780},
      {name: 'May', uv: 2000},
      {name: 'Jun', uv: 1800},
      {name: 'Jul', uv: 2600},
      {name: 'Aug', uv: 2900},
      {name: 'Sep', uv: 3500},
      {name: 'Oct', uv: 3000},
      {name: 'Nov', uv: 2400},
      {name: 'Dec', uv: 2780}
    ],
    newOrders: [
      {pv: 2400},
      {pv: 1398},
      {pv: 9800},
      {pv: 3908},
      {pv: 4800},
      {pv: 3490},
      {pv: 4300}
    ],
    browserUsage: [
      {name: 'Ready', value: 800, color: cyan600, icon: <ExpandMore/>},
      {name: 'Checkpoint', value: 300, color: pink600, icon: <ChevronRight/>},
      {name: 'Busy', value: 300, color: purple600, icon: <ExpandLess/>}
    ]
  }
};

export default data;
