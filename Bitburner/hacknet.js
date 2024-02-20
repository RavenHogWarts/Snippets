/** 
 * hacknet.js
 * 自动购买并升级hacknet-node 
 */
export async function main(ns) {
    // 求home主机目前可用金钱
	function myMoney() {
		return ns.getServerMoneyAvailable("home");
	}
    // 求目前拥有的hacknet-node数目
	function count() {
		return ns.hacknet.numNodes();
	}
    // 关闭Log输出
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");
    // 设定最大hacknet-node数目
	while(count()+1<=30){
        // 等待10s
		await ns.sleep(10000);
        // 当最后一个节点的cores升满级,代表全部节点已满级,可以购买一个新的节点
		if(ns.hacknet.getNodeStats(count()-1).cores==16){
			var cost = ns.hacknet.getPurchaseNodeCost();
			while(myMoney()<cost){
				await ns.sleep(3000);
			}
			var res = ns.hacknet.purchaseNode();
			ns.print("Purchased hacknet Node with index " + res);
			await ns.sleep(3000);
		}
		for(var i=0;i<count();i++){
            // 将节点的Level升满级,每次升10级,等待3秒
			while(ns.hacknet.getNodeStats(i).level<200){
				var cost = ns.hacknet.getLevelUpgradeCost(i,10);
				while(myMoney()<cost){
					ns.print("Need $" + cost + " . Have $" + myMoney());
					await ns.sleep(3000);
				}
				var res = ns.hacknet.upgradeLevel(i,10);
				await ns.sleep(3000);
			}
            // 将节点的Ram升满级,每次升2级,等待3秒
			while(ns.hacknet.getNodeStats(i).ram<64){
				var cost = ns.hacknet.getRamUpgradeCost(i,2);
				while (myMoney() < cost) {
					ns.print("Need $" + cost + " . Have $" + myMoney());
					await ns.sleep(3000);
				}
				var res = ns.hacknet.upgradeRam(i,2);
				await ns.sleep(3000);
			}
            // 将节点的Cores升满级,每次升1级,等待3秒
			while(ns.hacknet.getNodeStats(i).cores<16){
				var cost = ns.hacknet.getCoreUpgradeCost(i,1);
				while (myMoney() < cost) {
					ns.print("Need $" + cost + " . Have $" + myMoney());
					await ns.sleep(3000);
				}
				var res = ns.hacknet.upgradeCore(i,1);
				await ns.sleep(3000);
			}
		}
	}
}