/** 
 * found.js
 * 寻找某一服务器的scan路径,用于backdoor
 */
export async function main(ns) {
	// 需要寻找的服务器
	var target = ["run4theh111z"];//CSEC\avmnite-02h\I.I.I.I\run4theh111z\fulcrumassets
	var i = 0;
	// indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置
	// 当"home"出现在数组最后一位，则得出了寻找路径
	// scan()函数扫描出的值的第一个为上一级服务器名
	while(target.indexOf("home")==-1){
		var temp = ns.scan(target[i++]);
		target.push(temp[0]);
	}
	// 输出的路径为倒序
	ns.tprint(target);
}