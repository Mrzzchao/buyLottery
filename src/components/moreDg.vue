<template>
    <div v-if="peilv && match">
        <div class="ui-alert-full ui-alert-full-betsel">
            <div class="ui-alert-full-bd _parent">
                <div class="_child">
                <div class="popbox-betsel-hd" style="border-radius: 3px 3px 0 0;">
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
                        <div class="popbox-betsel-tablehd" v-if="peilv.nspf_pl&&peilv.nspf_pl.win||peilv.spf_pl&&peilv.spf_pl.win">胜平负/让球</div>
                        <div class="popbox-betsel-tablewrap" v-if="peilv.nspf_pl&&peilv.nspf_pl.win||peilv.spf_pl&&peilv.spf_pl.win">
                            <table class="popbox-betsel-table">
                                <tr v-if="peilv.nspf_pl.win">
                                    <th class="popbox-betsel-greenth">0</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.nspf.win}" v-tap="{methods: () => { selection.nspf.win = !selection.nspf.win}}">胜<i>{{peilv.nspf_pl.win}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.nspf.draw}" v-tap="{methods: () => { selection.nspf.draw = !selection.nspf.draw}}">平<i>{{peilv.nspf_pl.draw}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.nspf.lost}" v-tap="{methods: () => { selection.nspf.lost = !selection.nspf.lost}}">负<i>{{peilv.nspf_pl.lost}}</i></td>
                                </tr>
                                <tr v-if="peilv.spf_pl.win">
                                    <th class="popbox-betsel-blueth">{{(match.rangqiu > 0 ? '+' : '') + match.rangqiu}}</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.spf.win}" v-tap="{methods: () => { selection.spf.win = !selection.spf.win}}">胜<i>{{peilv.spf_pl.win}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.spf.draw}" v-tap="{methods: () => { selection.spf.draw = !selection.spf.draw}}">平<i>{{peilv.spf_pl.draw}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.spf.lost}" v-tap="{methods: () => { selection.spf.lost = !selection.spf.lost}}">负<i>{{peilv.spf_pl.lost}}</i></td>
                                </tr>

                            </table>
                        </div>
                    </template>

                    <template v-if="showOption[params.type].bf">
                        <div class="popbox-betsel-tablehd" v-if="peilv.bf_pl.a10">比分</div>
                        <div class="popbox-betsel-tablewrap" v-if="peilv.bf_pl.a10">
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-greenth" rowspan="3">胜</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a10}" v-tap="{methods: () => { selection.bf.a10 = !selection.bf.a10}}">1:0<i>{{peilv.bf_pl.a10}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a20}" v-tap="{methods: () => { selection.bf.a20 = !selection.bf.a20}}">2:0<i>{{peilv.bf_pl.a20}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a21}" v-tap="{methods: () => { selection.bf.a21 = !selection.bf.a21}}">2:1<i>{{peilv.bf_pl.a21}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a30}" v-tap="{methods: () => { selection.bf.a30 = !selection.bf.a30}}">3:0<i>{{peilv.bf_pl.a30}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a31}" v-tap="{methods: () => { selection.bf.a31 = !selection.bf.a31}}">3:1<i>{{peilv.bf_pl.a31}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a32}" v-tap="{methods: () => { selection.bf.a32 = !selection.bf.a32}}">3:2<i>{{peilv.bf_pl.a32}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a40}" v-tap="{methods: () => { selection.bf.a40 = !selection.bf.a40}}">4:0<i>{{peilv.bf_pl.a40}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a41}" v-tap="{methods: () => { selection.bf.a41 = !selection.bf.a41}}">4:1<i>{{peilv.bf_pl.a41}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a42}" v-tap="{methods: () => { selection.bf.a42 = !selection.bf.a42}}">4:2<i>{{peilv.bf_pl.a42}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a50}" v-tap="{methods: () => { selection.bf.a50 = !selection.bf.a50}}">5:0<i>{{peilv.bf_pl.a50}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a51}" v-tap="{methods: () => { selection.bf.a51 = !selection.bf.a51}}">5:1<i>{{peilv.bf_pl.a51}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.a52}" v-tap="{methods: () => { selection.bf.a52 = !selection.bf.a52}}">5:2<i>{{peilv.bf_pl.a52}}</i></td>
                                    <td class="jBetbtn" colspan="3" :class="{'betbtn-on': selection.bf.aother}" v-tap="{methods: () => { selection.bf.aother = !selection.bf.aother}}">胜其他<i>{{peilv.bf_pl.aother}}</i></td>
                                </tr>
                            </table>
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-blueth">平</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c00}" v-tap="{methods: () => { selection.bf.c00 = !selection.bf.c00}}">0:0<i>{{peilv.bf_pl.c00}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c11}" v-tap="{methods: () => { selection.bf.c11 = !selection.bf.c11}}">1:1<i>{{peilv.bf_pl.c11}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c22}" v-tap="{methods: () => { selection.bf.c22 = !selection.bf.c22}}">2:2<i>{{peilv.bf_pl.c22}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.c33}" v-tap="{methods: () => { selection.bf.c33 = !selection.bf.c33}}">3:3<i>{{peilv.bf_pl.c33}}</i></td>
                                    <td :class="{'betbtn-on': selection.bf.cother}" v-tap="{methods: () => { selection.bf.cother = !selection.bf.cother}}">
                                        平其他<i>{{peilv.bf_pl.cother}}</i>
                                    </td>
                                </tr>
                            </table>
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-greenth" rowspan="3">负</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b10}" v-tap="{methods: () => { selection.bf.b10 = !selection.bf.b10}}">0:1<i>{{peilv.bf_pl.b10}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b20}" v-tap="{methods: () => { selection.bf.b20 = !selection.bf.b20}}">0:2<i>{{peilv.bf_pl.b20}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b21}" v-tap="{methods: () => { selection.bf.b21 = !selection.bf.b21}}">1:2<i>{{peilv.bf_pl.b21}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b30}" v-tap="{methods: () => { selection.bf.b30 = !selection.bf.b30}}">3:0<i>{{peilv.bf_pl.b30}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b31}" v-tap="{methods: () => { selection.bf.b31 = !selection.bf.b31}}">1:3<i>{{peilv.bf_pl.b31}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b32}" v-tap="{methods: () => { selection.bf.b32 = !selection.bf.b32}}">2:3<i>{{peilv.bf_pl.b32}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b40}" v-tap="{methods: () => { selection.bf.b40 = !selection.bf.b40}}">0:4<i>{{peilv.bf_pl.b40}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b41}" v-tap="{methods: () => { selection.bf.b41 = !selection.bf.b41}}">1:4<i>{{peilv.bf_pl.b41}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b42}" v-tap="{methods: () => { selection.bf.b42 = !selection.bf.b42}}">2:4<i>{{peilv.bf_pl.b42}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b50}" v-tap="{methods: () => { selection.bf.b50 = !selection.bf.b50}}">0:5<i>{{peilv.bf_pl.b50}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b51}" v-tap="{methods: () => { selection.bf.b51 = !selection.bf.b51}}">1:5<i>{{peilv.bf_pl.b51}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bf.b52}" v-tap="{methods: () => { selection.bf.b52 = !selection.bf.b52}}">2:5<i>{{peilv.bf_pl.b52}}</i></td>
                                    <td class="jBetbtn" colspan="3" :class="{'betbtn-on': selection.bf.bother}" v-tap="{methods: () => { selection.bf.bother = !selection.bf.bother}}">
                                        负其他<i>{{peilv.bf_pl.bother}}</i>
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </template>

                    <template v-if="showOption[params.type].jqs">
                        <div class="popbox-betsel-tablehd" v-if="peilv.jqs_pl.s0">总进球</div>
                        <div class="popbox-betsel-tablewrap" v-if="peilv.jqs_pl.s0">
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-blueth" rowspan="2">总进球</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s0}" v-tap="{methods: () => { selection.jqs.s0 = !selection.jqs.s0}}">0球<i>{{peilv.jqs_pl.s0}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s1}" v-tap="{methods: () => { selection.jqs.s1 = !selection.jqs.s1}}">1球<i>{{peilv.jqs_pl.s1}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s2}" v-tap="{methods: () => { selection.jqs.s2 = !selection.jqs.s2}}">2球<i>{{peilv.jqs_pl.s2}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s3}" v-tap="{methods: () => { selection.jqs.s3 = !selection.jqs.s3}}">3球<i>{{peilv.jqs_pl.s3}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s4}" v-tap="{methods: () => { selection.jqs.s4 = !selection.jqs.s4}}">4球<i>{{peilv.jqs_pl.s4}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s5}" v-tap="{methods: () => { selection.jqs.s5 = !selection.jqs.s5}}">5球<i>{{peilv.jqs_pl.s5}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s6}" v-tap="{methods: () => { selection.jqs.s6 = !selection.jqs.s6}}">6球<i>{{peilv.jqs_pl.s6}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.jqs.s7}" v-tap="{methods: () => { selection.jqs.s7 = !selection.jqs.s7}}">7+球<i>{{peilv.jqs_pl.s7}}</i></td>
                                </tr>
                            </table>
                        </div>
                    </template>

                    <template v-if="showOption[params.type].bqc">
                        <div class="popbox-betsel-tablehd" v-if="peilv.bqc_pl.aa">半全场</div>
                        <div class="popbox-betsel-tablewrap" v-if="peilv.bqc_pl.aa">
                            <table class="popbox-betsel-table">
                                <tr>
                                    <th class="popbox-betsel-greenth" rowspan="3">半全场</th>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.aa}" v-tap="{methods: () => { selection.bqc.aa = !selection.bqc.aa}}">胜-胜<i>{{peilv.bqc_pl.aa}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ac}" v-tap="{methods: () => { selection.bqc.ac = !selection.bqc.ac}}">胜-平<i>{{peilv.bqc_pl.ac}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ab}" v-tap="{methods: () => { selection.bqc.ab = !selection.bqc.ab}}">胜-负<i>{{peilv.bqc_pl.ab}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ca}" v-tap="{methods: () => { selection.bqc.ca = !selection.bqc.ca}}">平-胜<i>{{peilv.bqc_pl.ca}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.cc}" v-tap="{methods: () => { selection.bqc.cc = !selection.bqc.cc}}">平-平<i>{{peilv.bqc_pl.cc}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.cb}" v-tap="{methods: () => { selection.bqc.cb = !selection.bqc.cb}}">平-负<i>{{peilv.bqc_pl.cb}}</i></td>
                                </tr>
                                <tr>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.ba}" v-tap="{methods: () => { selection.bqc.ba = !selection.bqc.ba}}">负-胜<i>{{peilv.bqc_pl.ba}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.bc}" v-tap="{methods: () => { selection.bqc.bc = !selection.bqc.bc}}">负-平<i>{{peilv.bqc_pl.bc}}</i></td>
                                    <td class="jBetbtn" :class="{'betbtn-on': selection.bqc.bb}" v-tap="{methods: () => { selection.bqc.bb = !selection.bqc.bb}}">负-负<i>{{peilv.bqc_pl.bb}}</i></td>
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
            peilv: this.params.peilv,
            selection: this.params.selection,   // 比赛选项配置
            showOption: {
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
                },
                dg: {
                    spf: true,
                    nspf: true,
                    bf: true,
                    jqs: true,
                    bqc: true,
                    dg: true
                }
            }
        }
    },
    methods: {
        onCancel() {
            this.params.onCancel()
        },
        onConfirm() {
            this.params.onConfirm()
        }
    }
}
</script>

<style lang="css">
</style>
