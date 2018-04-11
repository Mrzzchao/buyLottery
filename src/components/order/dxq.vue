<ul class="dingd-table nborder l-full l-scroll-y" drunk-scroll>
    <li class="slide"
        drunk-action="{{index * 0.1}} drunk"
        drunk-repeat="$item,index in selectedMatchlist">
        <div class="dingd-table-bd">
            <!--<div class="itm-td1">
                <i class="ico-del mtopone"></i>
            </div>-->
            <div class="itm-td1" drunk-on="click: removeItem($item.mid)">
                <i class="ico-del"></i>
            </div>
            <div class="dang-mteam">
                <span class="itm-team-l color6">{{$item.homesxname}}</span>
                <span class="vs-w">VS</span>
                <span class="itm-team-r color6">{{$item.awaysxname}}</span>
            </div>
            <div class="dx-box responsive bborder">
                        <span class="each-resone zongjq-box">
                            <span class="zongjq-pl">{{$item.yszq||'-'}}</span>
                            <span class="zongjq-name">总进球</span>
                        </span>
                <code drunk-on="click:selected[$item.mid].big = !selected[$item.mid].big"
                      drunk-class="{'cur': selected[$item.mid].big}">
                    <span class="qiu-fl">大球</span>
                    <span class="qiu-pl">{{$item.dxqpl.big}}</span>
                </code>
                <code drunk-on="click:selected[$item.mid].small = !selected[$item.mid].small"
                      drunk-class="{'cur': selected[$item.mid].small}">
                    <span class="qiu-fl">小球</span>
                    <span class="qiu-pl">{{$item.dxqpl.small}}</span>
                </code>
            </div>
        </div>
    </li>
    <div class="agree-box">
        <label id="agreechk">
            <i class="agree-box-chk" drunk-class="{'agree-box-chk-off':notAgreeNote}"
               drunk-on="click:notAgreeNote=!notAgreeNote"></i>
            <span class="agree-gray" style="color:#999">我已阅读并同意<span drunk-on="click: agreementVisible = true" class="agree-tzxy" style="color:#333">《竞猜型彩票投注须知》</span></span>
            <br/>
            <span class="agree-gray" style="color:#999">注：全场90分钟（含伤停补时，不含加时赛及点球大战），页面奖金仅供参考，实际奖金以投注成功时为准</span></label>
    </div>
</ul>


