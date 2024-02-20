/** 
 * auto.js
 * 自动scan并在扫描出的各服务器上运行hack.js脚本
 * 在home主机上运行home.js脚本 
 * 屏蔽了云服务器和darkweb
 */
export async function main(ns) {
	//在home主机上运行针对某一服务器的hack脚本,并留出一定的线程数用于运行其他脚本
	await ns.exec("home.js","home",ns.getServerMaxRam("home")*3/8-5);
	//一级服务器列表
	var serv = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","iron-gym"];
	for(var i=0;i<serv.length;++i){
		//根据NUKE需要的最少端口数进行判定
		switch(ns.getServerNumPortsRequired(serv[i])){
			case 0: {
				//NUKE所需端口数为0,直接NUKE
				await ns.nuke(serv[i]);
				if(ns.getServerMaxRam(serv[i]))
				{
					//将hack脚本文件从home主机复制到服务器
					await ns.scp("hack.js",serv[i],"home");
					//在相应服务器上运行hack脚本,并根据服务器的RAM大小,确定hack脚本的运行线程数
					await ns.exec("hack.js", serv[i], ns.getServerMaxRam(serv[i])==4?1:ns.getServerMaxRam(serv[i])*3/8);
				}
				break;
			}
			case 1:	{
				//如果存在"BruteSSH.exe"则解锁新端口,服务器最大RAM不为0,运行hack脚本
				if(ns.fileExists("BruteSSH.exe")){
					await ns.brutessh(serv[i]);
					await ns.nuke(serv[i]);
					if(ns.getServerMaxRam(serv[i]))
					{
						await ns.scp("hack.js",serv[i],"home");
						await ns.exec("hack.js", serv[i], ns.getServerMaxRam(serv[i])*3/8);
					}	
				}
				break;	
			}
			case 2: {
				//如果存在"FTPCrack.exe"则解锁新端口,服务器最大RAM不为0,运行hack脚本
				if(ns.fileExists("FTPCrack.exe")){
					await ns.ftpcrack(serv[i]);
					await ns.brutessh(serv[i]);
					await ns.nuke(serv[i]);
					if(ns.getServerMaxRam(serv[i]))
					{
						await ns.scp("hack.js",serv[i],"home");
						await ns.exec("hack.js", serv[i], ns.getServerMaxRam(serv[i])*3/8);
					}	
				}
				break;
			}
			case 3: {
				//如果存在"relaySMTP.exe"则解锁新端口,服务器最大RAM不为0,运行hack脚本
				if(ns.fileExists("relaySMTP.exe")){
					await ns.relaysmtp(serv[i]);
					await ns.ftpcrack(serv[i]);
					await ns.brutessh(serv[i]);
					await ns.nuke(serv[i]);
					if(ns.getServerMaxRam(serv[i]))
					{
						await ns.scp("hack.js",serv[i],"home");
						await ns.exec("hack.js", serv[i], ns.getServerMaxRam(serv[i])*3/8);
					}	
				}
				break;
			}
			case 4: {
				//如果存在"relaySMTP.exe"则解锁新端口,服务器最大RAM不为0,运行hack脚本
				if(ns.fileExists("HTTPWorm.exe")){
					await ns.httpworm(serv[i]);
					await ns.relaysmtp(serv[i]);
					await ns.ftpcrack(serv[i]);
					await ns.brutessh(serv[i]);
					await ns.nuke(serv[i]);
					if(ns.getServerMaxRam(serv[i]))
					{
						await ns.scp("hack.js",serv[i],"home");
						await ns.exec("hack.js", serv[i], ns.getServerMaxRam(serv[i])*3/8);
					}	
				}
				break;
			}
			case 5: {
				//如果存在"SQLInject.exe"则解锁新端口,服务器最大RAM不为0,运行hack脚本
				if(ns.fileExists("SQLInject.exe")){
					await ns.sqlinject(serv[i]);
					await ns.httpworm(serv[i]);
					await ns.relaysmtp(serv[i]);
					await ns.ftpcrack(serv[i]);
					await ns.brutessh(serv[i]);
					await ns.nuke(serv[i]);
					if(ns.getServerMaxRam(serv[i]))
					{
						await ns.scp("hack.js",serv[i],"home");
						await ns.exec("hack.js", serv[i], ns.getServerMaxRam(serv[i])*3/8);
					}	
				}
				break;
			}
			default: break;
		}
		//不断扫描下一级服务器,并添加到列表中
		var temp = ns.scan(serv[i]);
		// j取1,因为temp[0]是上一级服务器
		for(var j=1;j<temp.length;++j){
			serv.push(temp[j]);
		}
	}
}