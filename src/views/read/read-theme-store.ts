import {defineStore, StateTree} from "pinia";
import {system} from "../../util/system";

export class ThemeConstants {
    private constructor() {
    }

    public static readonly NIGHT_COLOR = "rgba(255,255,255,.5)";// 夜间模式的字体颜色
    public static readonly NIGHT_BACKGROUND = "#1a1a1a"; // 夜间模式的背景
    public static readonly MIN_FONT_SIZE = 12;// 最下字号
    public static readonly MAX_FONT_SIZE = 48; // 最大字号
    public static readonly MAX_BRIGHTNESS = 100; // 最大亮度
    public static readonly MIN_BRIGHTNESS = 1; // 最小亮度
}

export const useReadThemeStore = defineStore({
    id: 'ReadThemeStore',
    state: () => ({
        fontSize: 18, // 字号
        fontFamily: '', // 字体
        lineHeight: 1.4, // 行高
        letterSpacing: 0, // 字间距
        color: '#333', // 字体颜色
        background: 'url("/src/assets/image/wallpapers/default.jpg")', // 背景
        isNight: false, // 是否为夜间模式
        brightness: 100, // 当前亮度值
        brightnessAutoSystem: false, // 亮度跟随系统 暂时不支持
        segmentSpacing: 1, // 段间距
        statusBarColor: 'white', // 状态栏颜色
    }),
    getters: {
        styleObject: (state) => ({
            fontSize: state.fontSize + 'px',
            fontFamily: state.fontFamily,
            lineHeight: state.lineHeight,
            letterSpacing: state.letterSpacing + 'px',
            color: state.isNight ? ThemeConstants.NIGHT_COLOR : state.color,
            background: state.isNight ? ThemeConstants.NIGHT_BACKGROUND : state.background
        }),
    },
    actions: {
        /**
         * 设置字号
         * @param size 2|-2
         */
        setFontSize(size: 2 | -2) {
            const newVar = this.fontSize + size;
            if (newVar < ThemeConstants.MIN_FONT_SIZE || newVar > ThemeConstants.MAX_FONT_SIZE) return;
            this.fontSize = newVar;
        },
        setTheme(theme: Theme) {
            if (theme.color) this.color = theme.color;
            if (theme.fontSize) this.fontSize = theme.fontSize;
            if (theme.fontFamily) this.fontFamily = theme.fontFamily;
            if (theme.background) this.background = theme.background;
            if (theme.lineHeight) this.lineHeight = theme.lineHeight;
            if (theme.letterSpacing) this.letterSpacing = theme.letterSpacing;
        },
        /**
         * 亮度拖动时跟随触发
         * @param brightness 当前亮度 1-100
         */
        setBrightness(brightness: number) {
            this.brightness = brightness;
            system.brightness(brightness);
        },
        // 设置亮度跟随系统
        setBrightnessAutoSystem() {
            this.brightnessAutoSystem = !this.brightnessAutoSystem;
            console.error("暂不支持此功能")
        }
    }
})

export interface Theme extends StateTree {
    fontSize: number | null;
    fontFamily: string | null;
    lineHeight: number | null;
    letterSpacing: number | null;
    color: string | null;
    background: string | null;
}

