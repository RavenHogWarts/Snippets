/**
 * hack.js
 * 运行在相应服务器上
 */
export async function main(ns) {
	function ServCurSecurLv(serv){
		return ns.getServerSecurityLevel(serv);
	}
	function ServCurMoney(serv){
		return ns.getServerMoneyAvailable(serv);
	}

	// 关闭Log输出
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getServerMaxMoney");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("sleep");
	// 获取当前文件所在服务器的名称
	var target = ns.getHostname();
	// 或者设定成想要hack的服务器名称
	// var target = "n00dles";
	// 获取服务器的最小安全等级
	var ServMinSecurLv = ns.getServerMinSecurityLevel(target);
	// 获取服务器的可用资金容量
	var ServMaxMoney= ns.getServerMaxMoney(target);
	
	while(true){
		await ns.sleep(5000);
		// 若服务器可用资金容量为0,则一直运行weaken函数
		if(ServMaxMoney==0){
			while(true){
				await ns.weaken(target);
			}
		}
		// 当前可用资金不足,开始grow
		if(ServCurMoney(target)<ServMaxMoney*0.2){
			// 当前安全等级过高,开始weaken
			if(ServCurSecurLv(target)>=ServMinSecurLv*3){
				while(ServCurSecurLv(target)>=ServMinSecurLv*1.5){
					await ns.weaken(target);
				}	
			}
			else{
				// 资金已grow到足够量时,停止grow
				while(ServCurMoney(target)<ServMaxMoney*0.75){
					// 当安全等级过高,停止grow进行weaken
					if(ServCurSecurLv(target)>=ServMinSecurLv*3){
						while(ServCurSecurLv(target)>=ServMinSecurLv*1.5){
							await ns.weaken(target);
						}	
					}
					await ns.grow(target);
				}
			}
		}
		// 当前可用资金充足,开始hack
		else{
			// 当前安全等级过高,开始weaken
			if(ServCurSecurLv(target)>=ServMinSecurLv*3){
				while(ServCurSecurLv(target)>=ServMinSecurLv*1.5){
					await ns.weaken(target);
				}	
			}
			else{
				// 资金严重不足时,停止hack
				while(ServCurMoney(target)>ServMaxMoney*0.01){
					// 当安全等级过高,停止hack进行weaken
					if(ServCurSecurLv(target)>=ServMinSecurLv*3){
						while(ServCurSecurLv(target)>=ServMinSecurLv*1.5){
							await ns.weaken(target);
						}	
					}
					await ns.hack(target);
				}
			}
		}
	}
}