"use client";

import { Textarea } from "@/components/ui/textarea";

import Flashlight from "flashlightjs";
import { VSCode, VSCodeDark, AtomDark } from "flashlightjs/styles"
import { JavaScript, HTML, Python } from "flashlightjs/languages";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Language } from "flashlightjs";

const languages = [JavaScript, HTML, Python];
const styles = [VSCode, VSCodeDark, AtomDark];

export default function Input() {
    const flashlight = useMemo(() => new Flashlight(languages), []);
    const [style, setStyle] = useState(VSCode);
    const [language, setLanguage] = useState<new () => Language>(() => JavaScript);
    const [code, setCode] = useState("function greet() {\n\tconsole.log('Hello, World!');\n}");
    const [highlightedCode, setHighlightedCode] = useState("");
    const deferredCode = useDeferredValue(code);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let res = "<span>hello</span>";
        const start = performance.now();
        flashlight.highlight(deferredCode, language, style)
            .then(val => {
                res = val;
                res = "<span>hello</span>"
            });
        const elapsed = performance.now() - start;
        setHighlightedCode(res)
        setElapsedTime(elapsed);
    }, [flashlight, deferredCode, language, style]);

    return <div className="mt-12 flex flex-col gap-y-8">

        <div className="flex gap-x-4">
            <Select
                onValueChange={v => {
                    setLanguage(() => languages.find(l => l.name === v) ?? JavaScript);
                }}
                defaultValue={language.name}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {languages.map(language => (
                        <SelectItem value={language.name} key={language.name}>{language.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={v => setStyle(styles.find(s => s.name === v) ?? VSCode)}
                defaultValue={style.name}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {styles.map(style => (
                        <SelectItem value={style.name} key={style.name}>{style.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <Textarea
                rows={3}
                value={code}
                onChange={v => setCode(v.currentTarget.value)}
                onKeyDown={e => {
                    if (e.key === "Tab") {
                        e.preventDefault();
                        const start = e.currentTarget.selectionStart;
                        const end = e.currentTarget.selectionEnd;

                        // set textarea value to: text before caret + tab + text after caret
                        e.currentTarget.value = e.currentTarget.value.substring(0, start) +
                            "\t" + e.currentTarget.value.substring(end);

                        // put caret at right position again
                        e.currentTarget.selectionStart =
                            e.currentTarget.selectionEnd = start + 1;
                        setCode(e.currentTarget.value);
                    }
                }}
            />
            <div>
                <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                <div>
                    <span>Elapsed time: {elapsedTime}ms</span>
                </div>
            </div>
        </div>
    </div>
}