<template>
    <ul class="dingd-table l-full l-scroll-y" drunk-scroll>
    <li class="slide"
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
                            <span class="betbtn"
                                  drunk-class="{'betbtn-on':$item.hasSelectedOptions}"
                                  drunk-on="click:
                                    currentMatch = $item,
                                    currentMatchSelection = selected[$item.mid],
                                    optionsVisible = true">
                                {{selected[$item.mid]|formatSelectedHt|truncate:30}}
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
</template>

<script>
import {SelectNameMap} from '~common/constants'
export default {
}
</script>

<style lang="css">
</style>
