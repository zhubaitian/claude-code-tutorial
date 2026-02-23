import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
         Header, Footer, AlignmentType, PageOrientation, LevelFormat,
         HeadingLevel, BorderStyle, WidthType, ShadingType,
         VerticalAlign, PageNumber, TableOfContents } from 'docx';

// 创建文档
const doc = new Document({
    styles: {
        default: {
            document: {
                run: {
                    font: "Arial",
                    size: 24  // 12pt默认大小
                }
            }
        },
        paragraphStyles: [
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, font: "Arial" },
                paragraph: {
                    spacing: { before: 240, after: 240 },
                    outlineLevel: 0  // 目录需要
                }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 28, bold: true, font: "Arial" },
                paragraph: {
                    spacing: { before: 180, after: 180 },
                    outlineLevel: 1
                }
            },
            {
                id: "Heading3",
                name: "Heading 3",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 26, bold: true, font: "Arial" },
                paragraph: {
                    spacing: { before: 120, after: 120 },
                    outlineLevel: 2
                }
            }
        ]
    },
    numbering: {
        config: [
            {
                reference: "bullets",
                levels: [{
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: "•",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 }
                        }
                    }
                }]
            },
            {
                reference: "numbers",
                levels: [{
                    level: 0,
                    format: LevelFormat.DECIMAL,
                    text: "%1.",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 }
                        }
                    }
                }]
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                size: {
                    width: 12240,   // 8.5英寸 (US Letter)
                    height: 15840   // 11英寸
                },
                margin: {
                    top: 1440,      // 1英寸
                    right: 1440,
                    bottom: 1440,
                    left: 1440
                }
            }
        },
        children: [
            // 标题页
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { before: 2400, after: 1200 },
                children: [
                    new TextRun({
                        text: "Anthropics Skills 仓库文档",
                        bold: true,
                        size: 48
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 1200, after: 2400 },
                children: [
                    new TextRun({
                        text: "GitHub 仓库内容整理",
                        size: 36
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 600, after: 2400 },
                children: [
                    new TextRun({
                        text: `生成日期: ${new Date().toLocaleDateString('zh-CN')}`,
                        size: 28
                    })
                ]
            }),

            // 目录
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [
                    new TextRun({
                        text: "目录",
                        bold: true
                    })
                ]
            }),

            new TableOfContents("目录", {
                hyperlink: true,
                headingStyleRange: "1-3"
            }),

            // 1. 仓库概述
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "1. 仓库概述",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "这是 Anthropics 的 Skills 仓库文档，总结了 GitHub 仓库 ",
                        size: 24
                    }),
                    new TextRun({
                        text: "https://github.com/anthropics/skills",
                        bold: true,
                        color: "0000FF",
                        underline: {}
                    }),
                    new TextRun({
                        text: " 的关键信息。",
                        size: 24
                    })
                ]
            }),

            // 仓库基本信息表格
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                    new TextRun({
                        text: "1.1 仓库基本信息",
                        bold: true
                    })
                ]
            }),

            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [3000, 6360],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                verticalAlign: VerticalAlign.CENTER,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "仓库名称",
                                                bold: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 6360, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "anthropics/skills"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                verticalAlign: VerticalAlign.CENTER,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "描述",
                                                bold: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 6360, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Public repository for Agent Skills"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                verticalAlign: VerticalAlign.CENTER,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "星标/分支/关注",
                                                bold: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 6360, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "69.5k ⭐ | 7k Forks | 508 Watching"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                verticalAlign: VerticalAlign.CENTER,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "主要编程语言",
                                                bold: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 6360, type: WidthType.DXA },
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
                                },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Python (91.3%), HTML (4.5%), Shell (2.5%), JavaScript (1.7%)"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),

            // 2. 什么是 Skills?
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "2. 什么是 Skills?",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Skills 是包含指令、脚本和资源的文件夹，Claude 动态加载这些内容以提高在特定任务上的表现。",
                        size: 24
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "它们教会 Claude 如何以可重复的方式完成特定任务，例如：",
                        size: 24
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "使用公司品牌指南创建文档"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "使用组织特定的工作流程分析数据"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "自动化个人任务"
                    })
                ]
            }),

            // 3. 仓库结构
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "3. 仓库结构",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "仓库的主要目录结构如下：",
                        size: 24
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "├── .claude-plugin/          # Claude 插件配置",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "├── skills/                  # Skill 示例（创意与设计、开发与技术、企业与通信、文档技能）",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "├── spec/                    # Agent Skills 规范",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "├── template/                # Skill 模板",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "├── .gitignore",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "├── README.md",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "└── THIRD_PARTY_NOTICES.md",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            // 4. 主要特性
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "4. 主要特性",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "numbers", level: 0 },
                children: [
                    new TextRun({
                        text: "示例 Skills：创意应用（艺术、音乐、设计）、技术任务（测试 Web 应用、MCP 服务器生成）、企业工作流程",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "numbers", level: 0 },
                children: [
                    new TextRun({
                        text: "文档 Skills：源可用（非开源）技能，用于在 skills/docx、skills/pdf、skills/pptx、skills/xlsx 中创建/编辑文档",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "numbers", level: 0 },
                children: [
                    new TextRun({
                        text: "开源：大多数技能采用 Apache 2.0 许可证",
                        bold: true
                    })
                ]
            }),

            // 5. 使用说明
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "5. 使用说明",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                    new TextRun({
                        text: "5.1 在 Claude Code 中使用",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "在 Claude Code 中，可以使用以下命令：",
                        size: 24
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "/plugin marketplace add anthropics/skills",
                        font: "Courier New",
                        size: 22,
                        color: "008000"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "# 然后安装特定的技能集：",
                        font: "Courier New",
                        size: 22,
                        color: "808080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "/plugin install document-skills@anthropic-agent-skills",
                        font: "Courier New",
                        size: 22,
                        color: "008000"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "/plugin install example-skills@anthropic-agent-skills",
                        font: "Courier New",
                        size: 22,
                        color: "008000"
                    })
                ]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                    new TextRun({
                        text: "5.2 在 Claude.ai 中使用",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "适用于付费计划；遵循 \"Using skills in Claude\" 中的说明",
                        size: 24
                    })
                ]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [
                    new TextRun({
                        text: "5.3 通过 Claude API 使用",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "使用 Anthropic 的预构建技能或通过 Skills API 上传自定义技能",
                        size: 24
                    })
                ]
            }),

            // 6. 创建基础 Skill
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "6. 创建基础 Skill",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Skills 需要一个包含 SKILL.md 文件的文件夹，该文件包含 YAML 前导码：",
                        size: 24
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "---",
                        font: "Courier New",
                        size: 22,
                        color: "800080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "name: my-skill-name",
                        font: "Courier New",
                        size: 22,
                        color: "800080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "description: A clear description of what this skill does and when to use it",
                        font: "Courier New",
                        size: 22,
                        color: "800080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "---",
                        font: "Courier New",
                        size: 22,
                        color: "800080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "# My Skill Name",
                        font: "Courier New",
                        size: 22,
                        color: "000080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "[Add your instructions here that Claude will follow when this skill is active]",
                        font: "Courier New",
                        size: 22,
                        color: "808080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "## Examples",
                        font: "Courier New",
                        size: 22,
                        color: "000080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Example usage 1",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Example usage 2",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "## Guidelines",
                        font: "Courier New",
                        size: 22,
                        color: "000080"
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Guideline 1",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Guideline 2",
                        font: "Courier New",
                        size: 22
                    })
                ]
            }),

            // 7. 重要注意事项
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "7. 重要注意事项",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "免责声明：Skills 仅用于演示/教育目的",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "合作伙伴技能：包括 Claude 的 Notion 技能",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "规范：Agent Skills 标准记录在 agentskills.io",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "文档：创建和使用技能的支持文章链接",
                        bold: true
                    })
                ]
            }),

            // 8. 相关资源
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "8. 相关资源",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "什么是技能？: ",
                        bold: true
                    }),
                    new TextRun({
                        text: "https://support.claude.com/en/articles/12512176-what-are-skills",
                        color: "0000FF",
                        underline: {}
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "在 Claude 中使用技能: ",
                        bold: true
                    }),
                    new TextRun({
                        text: "https://support.claude.com/en/articles/12512180-using-skills-in-claude",
                        color: "0000FF",
                        underline: {}
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "创建自定义技能: ",
                        bold: true
                    }),
                    new TextRun({
                        text: "https://support.claude.com/en/articles/12512198-creating-custom-skills",
                        color: "0000FF",
                        underline: {}
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "bullets", level: 0 },
                children: [
                    new TextRun({
                        text: "Skills API 快速入门: ",
                        bold: true
                    }),
                    new TextRun({
                        text: "https://docs.claude.com/en/api/skills-guide#creating-a-skill",
                        color: "0000FF",
                        underline: {}
                    })
                ]
            }),

            // 结束语
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
                children: [
                    new TextRun({
                        text: "文档结束",
                        bold: true
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 1200, after: 1200 },
                children: [
                    new TextRun({
                        text: "--- 文档生成完成 ---",
                        size: 28,
                        color: "808080"
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "此文档基于 GitHub 仓库 https://github.com/anthropics/skills 内容生成",
                        size: 22,
                        color: "808080"
                    })
                ]
            })
        ]
    }]
});

// 生成文档
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('Anthropics-Skills-文档.docx', buffer);
    console.log('Word 文档已生成: Anthropics-Skills-文档.docx');
}).catch((error) => {
    console.error('生成文档时出错:', error);
});