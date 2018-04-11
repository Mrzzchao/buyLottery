<ul class="dingd-table l-full l-scroll-y" drunk-scroll>
    <li class="slide"
        drunk-action="{{index * 0.1}} drunk"
        drunk-repeat="$item,index in selectedMatchlist">

        <div class="dingd-table-bd">
            <div class="itm-td1" drunk-on="click: removeItem($item.mid)">
                <i class="ico-del"></i>
            </div>
            <div class="itm-td2">
                <div class="betbtn-3btn-m">
                    <div class="betbtn-rang"
                         drunk-class="{'betbtn-rang-green': $item.rangqiu < 0, 'betbtn-rang-red': $item.rangqiu > 0,}">
                        {{$item.rangqiu}}
                    </div>
                            <span class="betbtn"
                                  drunk-on="click:selected[$item.mid].win = !selected[$item.mid].win"
                                  drunk-class="{'betbtn-on': selected[$item.mid].win}">
                                <span class="gray" drunk-if='$item.homestanding > 0'>[{{$item.homestanding}}]</span>
                                {{$item.homesxname}}
                                <i>主胜{{$item.spfpl.win}}</i>
                            </span>
                            <span class="betbtn"
                                  drunk-on="click:selected[$item.mid].draw = !selected[$item.mid].draw"
                                  drunk-class="{'betbtn-on': selected[$item.mid].draw}">
                                VS<i>平{{$item.spfpl.draw}}</i>
                            </span>
                            <span class="betbtn"
                                  drunk-on="click:selected[$item.mid].lost = !selected[$item.mid].lost"
                                  drunk-class="{'betbtn-on': selected[$item.mid].lost}">
                                {{$item.awaysxname}}
                                <span class="gray" drunk-if='$item.awaystanding > 0'>[{{$item.awaystanding}}]</span>
                                <i>客胜{{$item.spfpl.lost}}</i>
                            </span>
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
