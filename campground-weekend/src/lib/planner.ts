export type Costs={nights:number;people:number;lodging:number;rental:number;delivery:number;transport:number;fees:number;gear:number;food:number;taxRate:number};
export function estimate(c:Costs){
 for(const [k,v] of Object.entries(c))if(!Number.isFinite(v)||v<0||v>1000000)throw new Error(`Check ${k}: use a nonnegative number.`);
 if(!Number.isInteger(c.nights)||c.nights<1||!Number.isInteger(c.people)||c.people<1||c.taxRate>100)throw new Error('Nights and people must be positive whole numbers; tax must be 0–100%.');
 const lodging=c.nights*c.lodging,rental=c.nights*c.rental,food=c.nights*c.people*c.food;
 const subtotal=lodging+rental+food+c.delivery+c.transport+c.fees+c.gear;
 const tax=subtotal*c.taxRate/100,total=subtotal+tax;
 return {lodging,rental,food,subtotal,tax,total,perPerson:total/c.people};
}
export const checklist=['Reservation confirmation and campground map','Check weather, closures and seasonal water','Tent, stakes, groundsheet or cabin bedding','Sleeping bags and insulated sleeping pads','Headlamps and spare batteries','Drinking water and refill containers','Food, cooler and safe food storage','Stove, fuel and cooking supplies for outdoor use','Layers, rain jackets and dry socks','Sun protection and insect repellent','First aid kit and personal medications','Trash bags and cleaning supplies','Locally sourced firewood; check fire restrictions','Chargers and offline directions','Confirm pet rules and accessible facilities'];
