<template>
    <div>
        <div class="ui-alert-full ui-alert-full-betsel">
            <div class="ui-alert-full-bd _parent">
                <div class="_child">
                <div class="popbox-betsel-hd">
                    <!--<span class="ico-jiaj">加奖</span>-->
                    <span class="itm-team-l">
                        <i v-if="match.homestanding > 0">[{{match.homestanding}}]</i> {{match.homesxname}}
                    </span>
                    <span class="itm-vs">VS</span>
                    <span class="itm-team-r">
                        {{match.awaysxname}}
                        <i v-if="match.awaystanding > 0">[{{match.awaystanding}}]</i>
                    </span>
                </div>
                <div class="popbox-betsel-bd">
                    <template v-if="showOption[params.type].nspf">
                        <div class="popbox-betsel-tablehd" v-if="match.nspfpl&&match.nspfpl.win||match.spfpl&&match.spfpl.win">胜平负/让球</div>
                        <div class="popbox-betsel-tablewrap" v-if="match.nspfpl&&match.nspfpl.win||match.spfpl&&match.spfpl.win">
                            <table class="popbox-betsel-table">
                                <tr v-if="match.nspfpl.win">
                                    <th class="popbox-betsel-greenth">0</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.nspf.win}" v-tap="{methods: () => { selection.nspf.win = !selection.nspf.win}}">胜<i>{{match.nspfpl.win}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.nspf.draw}" v-tap="{methods: () => { selection.nspf.draw = !selection.nspf.draw}}">平<i>{{match.nspfpl.draw}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.nspf.lost}" v-tap="{methods: () => { selection.nspf.lost = !selection.nspf.lost}}">负<i>{{match.nspfpl.lost}}</i></td>
                                </tr>
                                <tr v-if="match.spfpl.win">
                                    <th class="popbox-betsel-blueth">{{(match.rangqiu > 0 ? '+' : '') + match.rangqiu}}</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.spf.win}" v-tap="{methods: () => { selection.spf.win = !selection.spf.win}}">胜<i>{{match.spfpl.win}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.spf.draw}" v-tap="{methods: () => { selection.spf.draw = !selection.spf.draw}}">平<i>{{match.spfpl.draw}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.spf.lost}" v-tap="{methods: () => { selection.spf.lost = !selection.spf.lost}}">负<i>{{match.spfpl.lost}}</i></td>
                                </tr>

                            </table>
                        </div>
                    </template>

                    <template v-if="showOption[params.type].bf">
                        <div class="popbox-betsel-tablehd" v-if="match.bfpl.a10">比分</div>
                        <div class="popbox-betsel-tablewrap" v-if="match.bfpl.a10">
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-greenth" rowspan="3">胜</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a10}" v-tap="{methods: () => { selection.bf.a10 = !selection.bf.a10}}">1:0<i>{{match.bfpl.a10}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a20}" v-tap="{methods: () => { selection.bf.a20 = !selection.bf.a20}}">2:0<i>{{match.bfpl.a20}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a21}" v-tap="{methods: () => { selection.bf.a21 = !selection.bf.a21}}">2:1<i>{{match.bfpl.a21}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a30}" v-tap="{methods: () => { selection.bf.a30 = !selection.bf.a30}}">3:0<i>{{match.bfpl.a30}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a31}" v-tap="{methods: () => { selection.bf.a31 = !selection.bf.a31}}">3:1<i>{{match.bfpl.a31}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a32}" v-tap="{methods: () => { selection.bf.a32 = !selection.bf.a32}}">3:2<i>{{match.bfpl.a32}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a40}" v-tap="{methods: () => { selection.bf.a40 = !selection.bf.a40}}">4:0<i>{{match.bfpl.a40}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a41}" v-tap="{methods: () => { selection.bf.a41 = !selection.bf.a41}}">4:1<i>{{match.bfpl.a41}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a42}" v-tap="{methods: () => { selection.bf.a42 = !selection.bf.a42}}">4:2<i>{{match.bfpl.a42}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a50}" v-tap="{methods: () => { selection.bf.a50 = !selection.bf.a50}}">5:0<i>{{match.bfpl.a50}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a51}" v-tap="{methods: () => { selection.bf.a51 = !selection.bf.a51}}">5:1<i>{{match.bfpl.a51}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a52}" v-tap="{methods: () => { selection.bf.a52 = !selection.bf.a52}}">5:2<i>{{match.bfpl.a52}}</i></td>
                                    <td class="jBetbtn" colspan="3" :class="{'betbtn-on': selection.bf.aother}" v-tap="{methods: () => { selection.bf.aother = !selection.bf.aother}}">胜其他<i>{{match.bfpl.aother}}</i></td>
                                </tr>
                            </table>
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-blueth">平</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c00}" v-tap="{methods: () => { selection.bf.c00 = !selection.bf.c00}}">0:0<i>{{match.bfpl.c00}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c11}" v-tap="{methods: () => { selection.bf.c11 = !selection.bf.c11}}">1:1<i>{{match.bfpl.c11}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c22}" v-tap="{methods: () => { selection.bf.c22 = !selection.bf.c22}}">2:2<i>{{match.bfpl.c22}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c33}" v-tap="{methods: () => { selection.bf.c33 = !selection.bf.c33}}">3:3<i>{{match.bfpl.c33}}</i></td>
                                    <td :class="{'betbtn-on': selection.bf.cother}" v-tap="{methods: () => { selection.bf.cother = !selection.bf.cother}}">
                                        平其他<i>{{match.bfpl.cother}}</i>
                                    </td>
                                </tr>
                            </table>
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-greenth" rowspan="3">负</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b10}" v-tap="{methods: () => { selection.bf.b10 = !selection.bf.b10}}">0:1<i>{{match.bfpl.b10}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b20}" v-tap="{methods: () => { selection.bf.b20 = !selection.bf.b20}}">0:2<i>{{match.bfpl.b20}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b21}" v-tap="{methods: () => { selection.bf.b21 = !selection.bf.b21}}">1:2<i>{{match.bfpl.b21}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b30}" v-tap="{methods: () => { selection.bf.b30 = !selection.bf.b30}}">3:0<i>{{match.bfpl.b30}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b31}" v-tap="{methods: () => { selection.bf.b31 = !selection.bf.b31}}">1:3<i>{{match.bfpl.b31}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b32}" v-tap="{methods: () => { selection.bf.b32 = !selection.bf.b32}}">2:3<i>{{match.bfpl.b32}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b40}" v-tap="{methods: () => { selection.bf.b40 = !selection.bf.b40}}">0:4<i>{{match.bfpl.b40}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b41}" v-tap="{methods: () => { selection.bf.b41 = !selection.bf.b41}}">1:4<i>{{match.bfpl.b41}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b42}" v-tap="{methods: () => { selection.bf.b42 = !selection.bf.b42}}">2:4<i>{{match.bfpl.b42}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b50}" v-tap="{methods: () => { selection.bf.b50 = !selection.bf.b50}}">0:5<i>{{match.bfpl.b50}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b51}" v-tap="{methods: () => { selection.bf.b51 = !selection.bf.b51}}">1:5<i>{{match.bfpl.b51}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b52}" v-tap="{methods: () => { selection.bf.b52 = !selection.bf.b52}}">2:5<i>{{match.bfpl.b52}}</i></td>
                                    <td class="jBetbtn" colspan="3" :class="{'betbtn-on': selection.bf.bother}" v-tap="{methods: () => { selection.bf.bother = !selection.bf.bother}}">
                                        负其他<i>{{match.bfpl.bother}}</i>
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </template>

                    <template v-if="showOption[params.type].jqs">
                        <div class="popbox-betsel-tablehd" v-if="match.jqspl.s0">总进球</div>
                        <div class="popbox-betsel-tablewrap" v-if="match.jqspl.s0">
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-blueth" rowspan="2">总进球</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s0}" v-tap="{methods: () => { selection.jqs.s0 = !selection.jqs.s0}}">0球<i>{{match.jqspl.s0}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s1}" v-tap="{methods: () => { selection.jqs.s1 = !selection.jqs.s1}}">1球<i>{{match.jqspl.s1}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s2}" v-tap="{methods: () => { selection.jqs.s2 = !selection.jqs.s2}}">2球<i>{{match.jqspl.s2}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s3}" v-tap="{methods: () => { selection.jqs.s3 = !selection.jqs.s3}}">3球<i>{{match.jqspl.s3}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s4}" v-tap="{methods: () => { selection.jqs.s4 = !selection.jqs.s4}}">4球<i>{{match.jqspl.s4}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s5}" v-tap="{methods: () => { selection.jqs.s5 = !selection.jqs.s5}}">5球<i>{{match.jqspl.s5}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s6}" v-tap="{methods: () => { selection.jqs.s6 = !selection.jqs.s6}}">6球<i>{{match.jqspl.s6}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s7}" v-tap="{methods: () => { selection.jqs.s7 = !selection.jqs.s7}}">7+球<i>{{match.jqspl.s7}}</i></td>
                                </tr>
                            </table>
                        </div>
                    </template>

                    <template v-if="showOption[params.type].bqc">
                        <div class="popbox-betsel-tablehd" v-if="match.bqcpl.aa">半全场</div>
                        <div class="popbox-betsel-tablewrap" v-if="match.bqcpl.aa">
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-greenth" rowspan="3">半全场</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.aa}" v-tap="{methods: () => { selection.bqc.aa = !selection.bqc.aa}}">胜-胜<i>{{match.bqcpl.aa}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ac}" v-tap="{methods: () => { selection.bqc.ac = !selection.bqc.ac}}">胜-平<i>{{match.bqcpl.ac}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ab}" v-tap="{methods: () => { selection.bqc.ab = !selection.bqc.ab}}">胜-负<i>{{match.bqcpl.ab}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ca}" v-tap="{methods: () => { selection.bqc.ca = !selection.bqc.ca}}">平-胜<i>{{match.bqcpl.ca}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.cc}" v-tap="{methods: () => { selection.bqc.cc = !selection.bqc.cc}}">平-平<i>{{match.bqcpl.cc}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.cb}" v-tap="{methods: () => { selection.bqc.cb = !selection.bqc.cb}}">平-负<i>{{match.bqcpl.cb}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ba}" v-tap="{methods: () => { selection.bqc.ba = !selection.bqc.ba}}">负-胜<i>{{match.bqcpl.ba}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.bc}" v-tap="{methods: () => { selection.bqc.bc = !selection.bqc.bc}}">负-平<i>{{match.bqcpl.bc}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.bb}" v-tap="{methods: () => { selection.bqc.bb = !selection.bqc.bb}}">负-负<i>{{match.bqcpl.bb}}</i></td>
                                </tr>
                            </table>
                        </div>
                    </template>
                </div>
                </div>
            </div>
            <div class="ui-alert-full-ft">
                <div class="ui-alert-ft">
                    <div class="ui-alert-btn" v-tap="{methods: onCancel}">取消</div>
                    <div class="ui-alert-btn" v-tap="{methods: onConfirm}">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["params"],
    data() {
        return {
            match: this.params.match,
            selection: this.params.selection,   // 比赛选项配置
            showOption: {
                all: {
                    spf: true,
                    nspf: true,
                    bf: true,
                    jqs: true,
                    bqc: true,
                    dg: true
                },
                ht: {
                    spf: true,
                    nspf: true,
                    bf: true,
                    jqs: true,
                    bqc: true,
                    dg: true
                },
                bf: {
                    spf: false,
                    nspf: false,
                    bf: true,
                    jqs: false,
                    bqc: false,
                    dg: false
                },
                bqc: {
                    spf: false,
                    nspf: false,
                    bf: false,
                    jqs: false,
                    bqc: true,
                    dg: false
                }
            }
        }
    },
    methods: {
        onCancel() {
            typeof this.params.onCancel === 'function' && this.params.onCancel()
        },
        onConfirm() {
            typeof this.params.onConfirm === 'function' && this.params.onConfirm()
        }
    }
}
</script>

<style lang="css">
</style>
