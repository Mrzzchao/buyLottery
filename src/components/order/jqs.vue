<ul class="dingd-table wrapper-jinqs l-full l-scroll-y" drunk-scroll>
    <li class="slide"
        drunk-action="{{index * 0.1}} drunk"
        drunk-repeat="$item,index in selectedMatchlist">
        <div class="dingd-table-hd">
            <div class="dang-mteam">
                        <span class="itm-team-l">
                            <i drunk-if="$item.homestanding > 0">[{{$item.homestanding}}]</i> {{$item.homesxname}}
                        </span>
                <span class="itm-vs">VS</span>
                        <span class="itm-team-r">
                            {{$item.awaysxname}}<i drunk-if="$item.awaystanding > 0"> [{{$item.awaystanding}}]</i>
                        </span>
            </div>
        </div>
        <div class="dingd-table-bd">
            <div class="itm-td1" drunk-on="click: removeItem($item.mid)">
                <i class="ico-del"></i>
            </div>
            <div class="itm-td2">
                <div class="betbtns-wrap">
                    <div class="betbtns">
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s0}"
                              drunk-on="click:selected[$item.mid].s0 = !selected[$item.mid].s0">0<i>{{$item.jqspl.s0}}</i></span>
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s1}"
                              drunk-on="click:selected[$item.mid].s1 = !selected[$item.mid].s1">1<i>{{$item.jqspl.s1}}</i></span>
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s2}"
                              drunk-on="click:selected[$item.mid].s2 = !selected[$item.mid].s2">2<i>{{$item.jqspl.s2}}</i></span>
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s3}"
                              drunk-on="click:selected[$item.mid].s3 = !selected[$item.mid].s3">3<i>{{$item.jqspl.s3}}</i></span>
                    </div>
                    <div class="betbtns">
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s4}"
                              drunk-on="click:selected[$item.mid].s4 = !selected[$item.mid].s4">4<i>{{$item.jqspl.s4}}</i></span>
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s5}"
                              drunk-on="click:selected[$item.mid].s5 = !selected[$item.mid].s5">5<i>{{$item.jqspl.s5}}</i></span>
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s6}"
                              drunk-on="click:selected[$item.mid].s6 = !selected[$item.mid].s6">6<i>{{$item.jqspl.s6}}</i></span>
                        <span drunk-class="{'betbtn-on': selected[$item.mid].s7}"
                              drunk-on="click:selected[$item.mid].s7 = !selected[$item.mid].s7">7+<i>{{$item.jqspl.s7}}</i></span>
                    </div>
                </div>
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



