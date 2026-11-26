import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { expect, test } from "@playwright/test";

test("协会首页、部门菜单和部门开屏可访问", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "中南大学人工智能协会", exact: true })).toBeVisible();
  await expect(page.locator("#departments .association-department")).toHaveCount(4);
  const menu = page.getByRole("navigation", { name: "全站导航" });
  await menu.locator("summary").click();
  await menu.getByRole("link", { name: "技术部", exact: true }).click();
  await expect(page).toHaveURL(/departments\/technology\/?$/);
  await expect(page.getByRole("heading", { name: "技术部", exact: true })).toBeVisible();
  await expect(page.locator(".association-hero-photo")).toHaveCSS("background-image", /technology\.jpg/);
  await page.getByRole("link", { name: "了解部门工作" }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("示例服务、目录与案例可访问", async ({ page }) => {
  await page.goto("/services/baoyan/");
  await expect(page.getByRole("heading", { name: "升学规划服务" })).toBeVisible();
  await page.getByRole("complementary", { name: "服务页目录" }).getByRole("link", { name: "服务流程" }).click();
  await expect(page).toHaveURL(/#service-part-4$/);
  await page.goto("/cases/baoyan/");
  await expect(page.getByText("升学规划 · 虚构示例", { exact: true }).first()).toBeVisible();
});

test("示例咨询流程无需外部服务", async ({ page }) => {
  await page.goto("/demo-form.html");
  await page.selectOption("#topic", "材料准备");
  await page.getByRole("button", { name: "预览确认" }).click();
  await expect(page.getByText("演示完成。已选方向：材料准备。")).toBeVisible();
});


test("单文件预览断网时也能查看五张开屏大图和四个部门", async ({ page, context }) => {
  test.skip(process.env.TEST_OFFLINE_PREVIEW !== "1", "通过离线预览工作流生成 HTML 后运行");
  await context.setOffline(true);
  await page.goto(pathToFileURL(resolve("preview/company-website-preview.html")).href);
  const site = page.frameLocator("iframe");
  await expect(site.getByRole("heading", { name: "中南大学人工智能协会", exact: true })).toBeVisible();
  const hero = site.locator(".association-hero-photo");
  const images = new Set([await hero.evaluate((element) => getComputedStyle(element).backgroundImage)]);
  const departments = ["组织部", "宣传部", "技术部", "外联部"];
  for (const [index, name] of departments.entries()) {
    await site.locator(".association-department").nth(index).click();
    await expect(site.getByRole("heading", { name, exact: true })).toBeVisible();
    await expect(hero).toHaveCSS("background-image", /data:image/);
    images.add(await hero.evaluate((element) => getComputedStyle(element).backgroundImage));
    await site.getByRole("link", { name: "首页", exact: true }).click();
  }
  expect(images.size).toBe(5);
  await page.setViewportSize({ width: 390, height: 844 });
  const nav = site.getByRole("navigation", { name: "全站导航" });
  await nav.locator("summary").click();
  await nav.getByRole("link", { name: "技术部", exact: true }).click();
  await expect(site.getByRole("heading", { name: "技术部", exact: true })).toBeVisible();
  await site.getByRole("link", { name: "了解部门工作" }).click();
  await expect(site.getByRole("heading", { name: "部门工作", exact: true })).toBeInViewport();
});
