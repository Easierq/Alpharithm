"use client";

import styles from "./sidebar.module.css";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";

const routes = [
  { id: 1, title: "Managers", url: "/managers" },
  { id: 3, title: "Jobs Page", url: "/jobs" },
  { id: 4, title: "Form actions", url: "/forms" },
  { id: 5, title: "Form templates", url: "/form-templates" },
  { id: 6, title: "Form Response", url: "/forms-responses" },
  { id: 7, title: "Public form links", url: "/form-links" },
];

export const Menu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("active-sidebar");
    } else {
      document.body.classList.remove("active-sidebar");
    }
  }, [open]);

  return (
    <div>
      <MenuIcon
        className="w-7 h-7 cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className={styles.container}>
          <X className={styles.close} onClick={() => setOpen(!open)} />
          {routes.map((item) => (
            <Link
              href={item.url}
              className={styles.link}
              key={item.id}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
