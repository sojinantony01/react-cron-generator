import Minutes from '../minutes';
import Daily from '../daily';
import Hourly from '../hourly';
import Weekly from '../weekly';
import Monthly from '../monthly';

export const tabs = ['Minutes','Hourly','Daily','Weekly', 'Monthly'];

export const metadata = [{
    component: Minutes,
    initialCron: ['0','0/1','*','*','*','?','*']
}, {
    component: Hourly,
    initialCron: ['0','0','00','1/1','*','?','*']
}, {
    component: Daily,
    initialCron: ['0','0','00','1/1','*','?','*']
}, {
    component: Weekly,
    initialCron: ['0','0','00','?','*','*','*']
}, {
    component: Monthly,
    initialCron: ['0','0','00','1','1/1','?','*']
}];