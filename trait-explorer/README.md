# 未來羅盤｜特質探索

「未來羅盤｜特質探索」是一個**純前端、手機優先**的青少年特質探索 Web App。學生依序完成十個生活情境選擇，每次都會收到一條 Aurora 蒐集到的航行線索；完成後，瀏覽器會依前端標籤加權邏輯整理三條主要特質，並產生可截圖收藏的探索卡。

本專案可直接部署至 **GitHub Pages**。它不需要資料庫、登入、後端 API、常駐 Node.js 服務、Gemini 或其他 AI API。探索進度僅暫存於使用者瀏覽器的 `localStorage`，不會傳送至任何伺服器。

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| `client/src/pages/Home.tsx` | 單一路徑互動流程、十座標狀態、localStorage 暫存、結果卡與 Aurora 互動。 |
| `client/src/data/traitExploration.ts` | 題目、選項、短線索、特質標籤權重、三種 Aurora 專屬留言的唯一資料來源。 |
| `client/src/index.css` | 星圖檔案庫視覺、響應式版面與所有互動動畫。 |
| `docs/TRAIT_RESULT_SYSTEM.md` | 十題特質權重、同分判定、三特質組合 Aurora 觀察與探索卡規則。 |
| `client/src/App.tsx` | React 應用程式根元件與全域互動提供者。 |
| `vite.config.ts` | 純靜態 Vite 建置設定；在 GitHub Actions 中自動使用 GitHub Pages 的儲存庫子路徑。 |
| `.github/workflows/deploy-pages.yml` | 推送到 `main` 後自動檢查、建置並部署 GitHub Pages 的工作流程。 |
| `client/public/.nojekyll` | 停用 GitHub Pages 的 Jekyll 處理，確保靜態資源原樣發布。 |

> 若要調整題目、線索或判定邏輯，請優先修改 `client/src/data/traitExploration.ts`。UI 不需要跟著逐題改寫。

## 本機開發

請使用 Node.js 22 與 pnpm 10。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

開發伺服器啟動後，可於終端機顯示的網址預覽。提交前可依序執行型別檢查與靜態建置：

```bash
pnpm check
pnpm build
pnpm preview
```

`pnpm build` 只會產出 `dist/` 靜態檔案。Vite 的靜態部署模式會把產物輸出到 `dist`，而 `vite preview` 僅用於本機驗收，不能作為正式伺服器。[1]

## 部署至 GitHub Pages

### 一次性 GitHub 設定

請先在 GitHub 建立一個新的儲存庫，並讓預設分支名稱為 `main`。接著將完整專案原始碼推送至該儲存庫。例如，若尚未初始化 Git，可在專案根目錄執行：

```bash
git init
git add .
git commit -m "Deploy Future Compass static web app"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<儲存庫名稱>.git
git push -u origin main
```

推送後，前往該儲存庫的 **Settings → Pages**，在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。工作流程會在每次推送至 `main` 時自動執行：安裝依賴、型別檢查、Vite 靜態建置、上傳 `dist/`，最後部署 GitHub Pages。這是 Vite 官方建議的 GitHub Pages 建置方式。[1]

| GitHub Pages 類型 | 預設公開網址 | 本專案的 `base` 行為 |
| --- | --- | --- |
| 專案網站 | `https://<帳號>.github.io/<儲存庫名稱>/` | GitHub Actions 會自動使用 `/<儲存庫名稱>/`。 |
| 使用者／組織網站 | `https://<帳號>.github.io/` | GitHub Actions 會自動使用 `/`。 |
| 自訂網域 | 依綁定網域而定 | 在 Actions 或本機建置設定 `VITE_BASE_PATH=/`。 |

完成第一次工作流程後，請到 **Actions** 檢查 `Deploy Future Compass to GitHub Pages` 已成功；GitHub Pages 的公開網址會顯示在工作流程的部署步驟與 Settings → Pages 中。

### 儲存庫名稱或分支不同時

工作流程預設監看 `main`。如果使用 `master` 或其他分支，請修改 `.github/workflows/deploy-pages.yml` 的 `branches: [main]`。Vite 對 GitHub Pages 專案網站需要使用 `/<儲存庫名稱>/` base；此專案已在 GitHub Actions 環境自動處理。若改用手動建置或特殊網域，可透過 `VITE_BASE_PATH` 明確覆寫。[1]

```bash
VITE_BASE_PATH=/你的儲存庫名稱/ pnpm build
```

## 純前端資料與隱私

學生每次選擇僅寫入瀏覽器的 `localStorage`，以避免重新整理時意外遺失進度。清除瀏覽器網站資料、使用無痕視窗，或改用其他裝置後，該次進度不會被保留。專案沒有表單上傳、第三方追蹤碼、遠端題庫或資料庫連線。

所有主視覺、羅盤標誌與星空紋理均由 CSS 與前端元件繪製，因此 GitHub Pages 發布時不依賴任何受管儲存或後端轉址。

## 發布前檢查

| 檢查項目 | 指令或位置 |
| --- | --- |
| 型別檢查 | `pnpm check` |
| 產生靜態檔案 | `pnpm build` |
| 本機確認靜態成果 | `pnpm preview` |
| Actions 部署紀錄 | GitHub 儲存庫 → Actions |
| Pages 網址與來源 | GitHub 儲存庫 → Settings → Pages |

## References

[1] [Vite — Deploying a Static Site](https://vite.dev/guide/static-deploy)
