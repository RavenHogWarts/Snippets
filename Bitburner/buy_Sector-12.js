/** 
 * buy_Sector-12.js
 * 地区:Sector-12
 * 自动购买8G云服务器，并自动运行buyrun.js脚本 
 */
export async function main(ns) {
	// 定义需要购买的云服务器的RAM大小
	var ram = 1024;
	var serv = ns.getPurchasedServers();
	var i = serv.length;
	// 如果购买过一些云服务器,则在这些云服务器上运行针对某一服务器的hack脚本
	if(i>0){
		for(var j=0;j<i;++j){
			await ns.scp("buyrun.js",serv[j],"home");
			await ns.exec("buyrun.js",serv[j],ram*3/8);
			} 
	}
	// 判断是否还有云服务器购买份额
	while(i<ns.getPurchasedServerLimit()){
		// 判断当前home主机上的钱是否足够购买一台云服务器
		if(ns.getServerMoneyAvailable("home")>ns.getPurchasedServerCost(ram)){
			// 云服务器的命名设为Serv-x
			var hn = ns.purchaseServer("Serv-"+i, ram);
			await ns.scp("buyrun.js",hn,"home");
			await ns.exec("buyrun.js",hn,ram*3/8);
			++i;
		}
		await ns.sleep(1000);
	}
}