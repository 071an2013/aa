import { fromEvent, interval } from "rxjs";
import { throttle } from "rxjs/operators";

export default {
  data() {
    return {
      raw: 0
    }
  },
  watch: {
    $route: {
      handler() {
        let key = "scrollTop-" + this.$route.path;
        this.$nextTick(() => {
          //console.log('恢复 scrollTop: ' + localStorage.getItem(key))
          this.$refs["mainContainer"].$el.scrollTop =
            localStorage.getItem(key) || 0;
        });
      }
    }
  },
  created() {
    let query = this.$route.query;
    if (query && query["_raw"]) {
      this.raw = query["_raw"];
    }
  },
  mounted() {
    let $main = this.$refs["mainContainer"].$el;
    fromEvent($main, "scroll")
      .pipe(throttle(ev => interval(500), {
        leading: false,
        trailing: true
      }))
      .subscribe(e => {
        let scrollTop = $main.scrollTop;
        let key = "scrollTop-" + this.$route.path;
        //console.log("保存 scrollTop: " + scrollTop);
        if (scrollTop > 0) {
          localStorage.setItem(key, scrollTop);
        } else {
          localStorage.removeItem(key);
        }
      });
  },
}