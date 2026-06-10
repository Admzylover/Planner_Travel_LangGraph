//城市数据结构 - 省/市两级联动
// 与后端 backend/app/core/cities.py 保持同步

export interface CityInfo {
  name: string
  adcode?: string
}

export interface ProvinceData {
  province: string
  provinceCode: string
  cities: CityInfo[]
}

export const CITIES_DATA: ProvinceData[] = [
  {
    province: "北京市",
    provinceCode: "110000",
    cities: [{ name: "北京市", adcode: "110000" }]
  },
  {
    province: "天津市",
    provinceCode: "120000",
    cities: [{ name: "天津市", adcode: "120000" }]
  },
  {
    province: "上海市",
    provinceCode: "310000",
    cities: [{ name: "上海市", adcode: "310000" }]
  },
  {
    province: "重庆市",
    provinceCode: "500000",
    cities: [{ name: "重庆市", adcode: "500000" }]
  },
  {
    province: "河北省",
    provinceCode: "130000",
    cities: [
      { name: "石家庄市", adcode: "130100" },
      { name: "唐山市", adcode: "130200" },
      { name: "秦皇岛市", adcode: "130300" },
      { name: "邯郸市", adcode: "130400" },
      { name: "邢台市", adcode: "130500" },
      { name: "保定市", adcode: "130600" },
      { name: "张家口市", adcode: "130700" },
      { name: "承德市", adcode: "130800" },
      { name: "沧州市", adcode: "130900" },
      { name: "廊坊市", adcode: "131000" },
      { name: "衡水市", adcode: "131100" }
    ]
  },
  {
    province: "山西省",
    provinceCode: "140000",
    cities: [
      { name: "太原市", adcode: "140100" },
      { name: "大同市", adcode: "140200" },
      { name: "阳泉市", adcode: "140300" },
      { name: "长治市", adcode: "140400" },
      { name: "晋城市", adcode: "140500" },
      { name: "朔州市", adcode: "140600" },
      { name: "晋中市", adcode: "140700" },
      { name: "运城市", adcode: "140800" },
      { name: "忻州市", adcode: "140900" },
      { name: "临汾市", adcode: "141000" },
      { name: "吕梁市", adcode: "141100" }
    ]
  },
  {
    province: "辽宁省",
    provinceCode: "210000",
    cities: [
      { name: "沈阳市", adcode: "210100" },
      { name: "大连市", adcode: "210200" },
      { name: "鞍山市", adcode: "210300" },
      { name: "抚顺市", adcode: "210400" },
      { name: "本溪市", adcode: "210500" },
      { name: "丹东市", adcode: "210600" },
      { name: "锦州市", adcode: "210700" },
      { name: "营口市", adcode: "210800" },
      { name: "阜新市", adcode: "210900" },
      { name: "辽阳市", adcode: "211000" },
      { name: "盘锦市", adcode: "211100" },
      { name: "铁岭市", adcode: "211200" },
      { name: "朝阳市", adcode: "211300" },
      { name: "葫芦岛市", adcode: "211400" }
    ]
  },
  {
    province: "吉林省",
    provinceCode: "220000",
    cities: [
      { name: "长春市", adcode: "220100" },
      { name: "吉林市", adcode: "220200" },
      { name: "四平市", adcode: "220300" },
      { name: "辽源市", adcode: "220400" },
      { name: "通化市", adcode: "220500" },
      { name: "白山市", adcode: "220600" },
      { name: "松原市", adcode: "220700" },
      { name: "白城市", adcode: "220800" },
      { name: "延边朝鲜族自治州", adcode: "222400" }
    ]
  },
  {
    province: "黑龙江省",
    provinceCode: "230000",
    cities: [
      { name: "哈尔滨市", adcode: "230100" },
      { name: "齐齐哈尔市", adcode: "230200" },
      { name: "鸡西市", adcode: "230300" },
      { name: "鹤岗市", adcode: "230400" },
      { name: "双鸭山市", adcode: "230500" },
      { name: "大庆市", adcode: "230600" },
      { name: "伊春市", adcode: "230700" },
      { name: "佳木斯市", adcode: "230800" },
      { name: "七台河市", adcode: "230900" },
      { name: "牡丹江市", adcode: "231000" },
      { name: "黑河市", adcode: "231100" },
      { name: "绥化市", adcode: "231200" }
    ]
  },
  {
    province: "江苏省",
    provinceCode: "320000",
    cities: [
      { name: "南京市", adcode: "320100" },
      { name: "无锡市", adcode: "320200" },
      { name: "徐州市", adcode: "320300" },
      { name: "常州市", adcode: "320400" },
      { name: "苏州市", adcode: "320500" },
      { name: "南通市", adcode: "320600" },
      { name: "连云港市", adcode: "320700" },
      { name: "淮安市", adcode: "320800" },
      { name: "盐城市", adcode: "320900" },
      { name: "扬州市", adcode: "321000" },
      { name: "镇江市", adcode: "321100" },
      { name: "泰州市", adcode: "321200" },
      { name: "宿迁市", adcode: "321300" }
    ]
  },
  {
    province: "浙江省",
    provinceCode: "330000",
    cities: [
      { name: "杭州市", adcode: "330100" },
      { name: "宁波市", adcode: "330200" },
      { name: "温州市", adcode: "330300" },
      { name: "嘉兴市", adcode: "330400" },
      { name: "湖州市", adcode: "330500" },
      { name: "绍兴市", adcode: "330600" },
      { name: "金华市", adcode: "330700" },
      { name: "衢州市", adcode: "330800" },
      { name: "舟山市", adcode: "330900" },
      { name: "台州市", adcode: "331000" },
      { name: "丽水市", adcode: "331100" }
    ]
  },
  {
    province: "安徽省",
    provinceCode: "340000",
    cities: [
      { name: "合肥市", adcode: "340100" },
      { name: "芜湖市", adcode: "340200" },
      { name: "蚌埠市", adcode: "340300" },
      { name: "淮南市", adcode: "340400" },
      { name: "马鞍山市", adcode: "340500" },
      { name: "淮北市", adcode: "340600" },
      { name: "铜陵市", adcode: "340700" },
      { name: "安庆市", adcode: "340800" },
      { name: "黄山市", adcode: "341000" },
      { name: "滁州市", adcode: "341100" },
      { name: "阜阳市", adcode: "341200" },
      { name: "宿州市", adcode: "341300" },
      { name: "六安市", adcode: "341500" },
      { name: "亳州市", adcode: "341600" },
      { name: "池州市", adcode: "341700" },
      { name: "宣城市", adcode: "341800" }
    ]
  },
  {
    province: "福建省",
    provinceCode: "350000",
    cities: [
      { name: "福州市", adcode: "350100" },
      { name: "厦门市", adcode: "350200" },
      { name: "莆田市", adcode: "350300" },
      { name: "三明市", adcode: "350400" },
      { name: "泉州市", adcode: "350500" },
      { name: "漳州市", adcode: "350600" },
      { name: "南平市", adcode: "350700" },
      { name: "龙岩市", adcode: "350800" },
      { name: "宁德市", adcode: "350900" }
    ]
  },
  {
    province: "江西省",
    provinceCode: "360000",
    cities: [
      { name: "南昌市", adcode: "360100" },
      { name: "景德镇市", adcode: "360200" },
      { name: "萍乡市", adcode: "360300" },
      { name: "九江市", adcode: "360400" },
      { name: "新余市", adcode: "360500" },
      { name: "鹰潭市", adcode: "360600" },
      { name: "赣州市", adcode: "360700" },
      { name: "吉安市", adcode: "360800" },
      { name: "宜春市", adcode: "360900" },
      { name: "抚州市", adcode: "361000" },
      { name: "上饶市", adcode: "361100" }
    ]
  },
  {
    province: "山东省",
    provinceCode: "370000",
    cities: [
      { name: "济南市", adcode: "370100" },
      { name: "青岛市", adcode: "370200" },
      { name: "淄博市", adcode: "370300" },
      { name: "枣庄市", adcode: "370400" },
      { name: "东营市", adcode: "370500" },
      { name: "烟台市", adcode: "370600" },
      { name: "潍坊市", adcode: "370700" },
      { name: "济宁市", adcode: "370800" },
      { name: "泰安市", adcode: "370900" },
      { name: "威海市", adcode: "371000" },
      { name: "日照市", adcode: "371100" },
      { name: "临沂市", adcode: "371300" },
      { name: "德州市", adcode: "371400" },
      { name: "聊城市", adcode: "371500" },
      { name: "滨州市", adcode: "371600" },
      { name: "菏泽市", adcode: "371700" }
    ]
  },
  {
    province: "河南省",
    provinceCode: "410000",
    cities: [
      { name: "郑州市", adcode: "410100" },
      { name: "开封市", adcode: "410200" },
      { name: "洛阳市", adcode: "410300" },
      { name: "平顶山市", adcode: "410400" },
      { name: "安阳市", adcode: "410500" },
      { name: "鹤壁市", adcode: "410600" },
      { name: "新乡市", adcode: "410700" },
      { name: "焦作市", adcode: "410800" },
      { name: "濮阳市", adcode: "410900" },
      { name: "许昌市", adcode: "411000" },
      { name: "漯河市", adcode: "411100" },
      { name: "三门峡市", adcode: "411200" },
      { name: "南阳市", adcode: "411300" },
      { name: "商丘市", adcode: "411400" },
      { name: "信阳市", adcode: "411500" },
      { name: "周口市", adcode: "411600" },
      { name: "驻马店市", adcode: "411700" }
    ]
  },
  {
    province: "湖北省",
    provinceCode: "420000",
    cities: [
      { name: "武汉市", adcode: "420100" },
      { name: "黄石市", adcode: "420200" },
      { name: "十堰市", adcode: "420300" },
      { name: "宜昌市", adcode: "420500" },
      { name: "襄阳市", adcode: "420600" },
      { name: "鄂州市", adcode: "420700" },
      { name: "荆门市", adcode: "420800" },
      { name: "孝感市", adcode: "420900" },
      { name: "荆州市", adcode: "421000" },
      { name: "黄冈市", adcode: "421100" },
      { name: "咸宁市", adcode: "421200" },
      { name: "随州市", adcode: "421300" },
      { name: "恩施土家族苗族自治州", adcode: "422800" }
    ]
  },
  {
    province: "湖南省",
    provinceCode: "430000",
    cities: [
      { name: "长沙市", adcode: "430100" },
      { name: "株洲市", adcode: "430200" },
      { name: "湘潭市", adcode: "430300" },
      { name: "衡阳市", adcode: "430400" },
      { name: "邵阳市", adcode: "430500" },
      { name: "岳阳市", adcode: "430600" },
      { name: "常德市", adcode: "430700" },
      { name: "张家界市", adcode: "430800" },
      { name: "益阳市", adcode: "430900" },
      { name: "郴州市", adcode: "431000" },
      { name: "永州市", adcode: "431100" },
      { name: "怀化市", adcode: "431200" },
      { name: "娄底市", adcode: "431300" },
      { name: "湘西土家族苗族自治州", adcode: "433100" }
    ]
  },
  {
    province: "广东省",
    provinceCode: "440000",
    cities: [
      { name: "广州市", adcode: "440100" },
      { name: "韶关市", adcode: "440200" },
      { name: "深圳市", adcode: "440300" },
      { name: "珠海市", adcode: "440400" },
      { name: "汕头市", adcode: "440500" },
      { name: "佛山市", adcode: "440600" },
      { name: "江门市", adcode: "440700" },
      { name: "湛江市", adcode: "440800" },
      { name: "茂名市", adcode: "440900" },
      { name: "肇庆市", adcode: "441200" },
      { name: "惠州市", adcode: "441300" },
      { name: "梅州市", adcode: "441400" },
      { name: "汕尾市", adcode: "441500" },
      { name: "河源市", adcode: "441600" },
      { name: "阳江市", adcode: "441700" },
      { name: "清远市", adcode: "441800" },
      { name: "东莞市", adcode: "441900" },
      { name: "中山市", adcode: "442000" },
      { name: "潮州市", adcode: "445100" },
      { name: "揭阳市", adcode: "445200" },
      { name: "云浮市", adcode: "445300" }
    ]
  },
  {
    province: "海南省",
    provinceCode: "460000",
    cities: [
      { name: "海口市", adcode: "460100" },
      { name: "三亚市", adcode: "460200" },
      { name: "三沙市", adcode: "460300" },
      { name: "儋州市", adcode: "460400" }
    ]
  },
  {
    province: "四川省",
    provinceCode: "510000",
    cities: [
      { name: "成都市", adcode: "510100" },
      { name: "自贡市", adcode: "510300" },
      { name: "攀枝花市", adcode: "510400" },
      { name: "泸州市", adcode: "510500" },
      { name: "德阳市", adcode: "510600" },
      { name: "绵阳市", adcode: "510700" },
      { name: "广元市", adcode: "510800" },
      { name: "遂宁市", adcode: "510900" },
      { name: "内江市", adcode: "511000" },
      { name: "乐山市", adcode: "511100" },
      { name: "南充市", adcode: "511300" },
      { name: "眉山市", adcode: "511400" },
      { name: "宜宾市", adcode: "511500" },
      { name: "广安市", adcode: "511600" },
      { name: "达州市", adcode: "511700" },
      { name: "雅安市", adcode: "511800" },
      { name: "巴中市", adcode: "511900" },
      { name: "资阳市", adcode: "512000" },
      { name: "阿坝藏族羌族自治州", adcode: "513200" },
      { name: "甘孜藏族自治州", adcode: "513300" },
      { name: "凉山彝族自治州", adcode: "513400" }
    ]
  },
  {
    province: "贵州省",
    provinceCode: "520000",
    cities: [
      { name: "贵阳市", adcode: "520100" },
      { name: "六盘水市", adcode: "520200" },
      { name: "遵义市", adcode: "520300" },
      { name: "安顺市", adcode: "520400" },
      { name: "毕节市", adcode: "520500" },
      { name: "铜仁市", adcode: "520600" },
      { name: "黔西南布依族苗族自治州", adcode: "522300" },
      { name: "黔东南苗族侗族自治州", adcode: "522600" },
      { name: "黔南布依族苗族自治州", adcode: "522700" }
    ]
  },
  {
    province: "云南省",
    provinceCode: "530000",
    cities: [
      { name: "昆明市", adcode: "530100" },
      { name: "曲靖市", adcode: "530300" },
      { name: "玉溪市", adcode: "530400" },
      { name: "保山市", adcode: "530500" },
      { name: "昭通市", adcode: "530600" },
      { name: "丽江市", adcode: "530700" },
      { name: "普洱市", adcode: "530800" },
      { name: "临沧市", adcode: "530900" },
      { name: "楚雄彝族自治州", adcode: "532300" },
      { name: "红河哈尼族彝族自治州", adcode: "532500" },
      { name: "文山壮族苗族自治州", adcode: "532600" },
      { name: "西双版纳傣族自治州", adcode: "532800" },
      { name: "大理白族自治州", adcode: "532900" },
      { name: "德宏傣族景颇族自治州", adcode: "533100" },
      { name: "怒江傈僳族自治州", adcode: "533300" },
      { name: "迪庆藏族自治州", adcode: "533400" }
    ]
  },
  {
    province: "陕西省",
    provinceCode: "610000",
    cities: [
      { name: "西安市", adcode: "610100" },
      { name: "铜川市", adcode: "610200" },
      { name: "宝鸡市", adcode: "610300" },
      { name: "咸阳市", adcode: "610400" },
      { name: "渭南市", adcode: "610500" },
      { name: "延安市", adcode: "610600" },
      { name: "汉中市", adcode: "610700" },
      { name: "榆林市", adcode: "610800" },
      { name: "安康市", adcode: "610900" },
      { name: "商洛市", adcode: "611000" }
    ]
  },
  {
    province: "甘肃省",
    provinceCode: "620000",
    cities: [
      { name: "兰州市", adcode: "620100" },
      { name: "嘉峪关市", adcode: "620200" },
      { name: "金昌市", adcode: "620300" },
      { name: "白银市", adcode: "620400" },
      { name: "天水市", adcode: "620500" },
      { name: "武威市", adcode: "620600" },
      { name: "张掖市", adcode: "620700" },
      { name: "平凉市", adcode: "620800" },
      { name: "酒泉市", adcode: "620900" },
      { name: "庆阳市", adcode: "621000" },
      { name: "定西市", adcode: "621100" },
      { name: "陇南市", adcode: "621200" },
      { name: "临夏回族自治州", adcode: "622900" },
      { name: "甘南藏族自治州", adcode: "623000" }
    ]
  },
  {
    province: "青海省",
    provinceCode: "630000",
    cities: [
      { name: "西宁市", adcode: "630100" },
      { name: "海东市", adcode: "630200" },
      { name: "海北藏族自治州", adcode: "632200" },
      { name: "黄南藏族自治州", adcode: "632300" },
      { name: "海南藏族自治州", adcode: "632500" },
      { name: "果洛藏族自治州", adcode: "632600" },
      { name: "玉树藏族自治州", adcode: "632700" },
      { name: "海西蒙古族藏族自治州", adcode: "632800" }
    ]
  },
  {
    province: "内蒙古自治区",
    provinceCode: "150000",
    cities: [
      { name: "呼和浩特市", adcode: "150100" },
      { name: "包头市", adcode: "150200" },
      { name: "乌海市", adcode: "150300" },
      { name: "赤峰市", adcode: "150400" },
      { name: "通辽市", adcode: "150500" },
      { name: "鄂尔多斯市", adcode: "150600" },
      { name: "呼伦贝尔市", adcode: "150700" },
      { name: "巴彦淖尔市", adcode: "150800" },
      { name: "乌兰察布市", adcode: "150900" },
      { name: "兴安盟", adcode: "152200" },
      { name: "锡林郭勒盟", adcode: "152500" },
      { name: "阿拉善盟", adcode: "152900" }
    ]
  },
  {
    province: "广西壮族自治区",
    provinceCode: "450000",
    cities: [
      { name: "南宁市", adcode: "450100" },
      { name: "柳州市", adcode: "450200" },
      { name: "桂林市", adcode: "450300" },
      { name: "梧州市", adcode: "450400" },
      { name: "北海市", adcode: "450500" },
      { name: "防城港市", adcode: "450600" },
      { name: "钦州市", adcode: "450700" },
      { name: "贵港市", adcode: "450800" },
      { name: "玉林市", adcode: "450900" },
      { name: "百色市", adcode: "451000" },
      { name: "贺州市", adcode: "451100" },
      { name: "河池市", adcode: "451200" },
      { name: "来宾市", adcode: "451300" },
      { name: "崇左市", adcode: "451400" }
    ]
  },
  {
    province: "西藏自治区",
    provinceCode: "540000",
    cities: [
      { name: "拉萨市", adcode: "540100" },
      { name: "日喀则市", adcode: "540200" },
      { name: "昌都市", adcode: "540300" },
      { name: "林芝市", adcode: "540400" },
      { name: "山南市", adcode: "540500" },
      { name: "那曲市", adcode: "540600" },
      { name: "阿里地区", adcode: "540700" }
    ]
  },
  {
    province: "宁夏回族自治区",
    provinceCode: "640000",
    cities: [
      { name: "银川市", adcode: "640100" },
      { name: "石嘴山市", adcode: "640200" },
      { name: "吴忠市", adcode: "640300" },
      { name: "固原市", adcode: "640400" },
      { name: "中卫市", adcode: "640500" }
    ]
  },
  {
    province: "新疆维吾尔自治区",
    provinceCode: "650000",
    cities: [
      { name: "乌鲁木齐市", adcode: "650100" },
      { name: "克拉玛依市", adcode: "650200" },
      { name: "吐鲁番市", adcode: "650400" },
      { name: "哈密市", adcode: "650500" },
      { name: "昌吉回族自治州", adcode: "652300" },
      { name: "博尔塔拉蒙古自治州", adcode: "652700" },
      { name: "巴音郭楞蒙古自治州", adcode: "652800" },
      { name: "阿克苏地区", adcode: "652900" },
      { name: "克孜勒苏柯尔克孜自治州", adcode: "653000" },
      { name: "喀什地区", adcode: "653100" },
      { name: "和田地区", adcode: "653200" },
      { name: "伊犁哈萨克自治州", adcode: "654000" },
      { name: "塔城地区", adcode: "654200" },
      { name: "阿勒泰地区", adcode: "654300" }
    ]
  },
  {
    province: "香港特别行政区",
    provinceCode: "810000",
    cities: [{ name: "香港", adcode: "810000" }]
  },
  {
    province: "澳门特别行政区",
    provinceCode: "820000",
    cities: [{ name: "澳门", adcode: "820000" }]
  },
  {
    province: "台湾省",
    provinceCode: "710000",
    cities: [
      { name: "台北市", adcode: "710100" },
      { name: "新北市", adcode: "710200" },
      { name: "桃园市", adcode: "710300" },
      { name: "台中市", adcode: "710400" },
      { name: "台南市", adcode: "710500" },
      { name: "高雄市", adcode: "710600" }
    ]
  }
]

// 获取所有城市名称列表（用于验证）
export function getAllCityNames(): string[] {
  const cities: string[] = []
  for (const province of CITIES_DATA) {
    for (const city of province.cities) {
      cities.push(city.name)
    }
  }
  return cities
}

// 根据城市名获取省份
export function getProvinceByCity(cityName: string): string | null {
  for (const province of CITIES_DATA) {
    for (const city of province.cities) {
      if (city.name === cityName) {
        return province.province
      }
    }
  }
  return null
}

// 根据城市名获取 adcode
export function getAdcodeByCity(cityName: string): string | null {
  for (const province of CITIES_DATA) {
    for (const city of province.cities) {
      if (city.name === cityName) {
        return city.adcode || null
      }
    }
  }
  return null
}