"use client";

import type { NextPage } from "next";
import { TokenEventsList } from "~~/components/TokenEventsList";

const EventsToken: NextPage = () => {
  return (
    <div className="flex flex-col bg-base-300 w-full px-8 py-12 justify-center gap-12">
      <h1 className="text-4xl font-bold mt-16 ">Token contract events</h1>
      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="token_events_tab" role="tab" className="tab" aria-label="Transfer Token Events" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div className="flex items-center flex-col flex-grow pt-10">
            {/* Stake Events */}
            <TokenEventsList title="Transfer Token Events" event="Transfer" label1="From" label2="To" label3="Amount" />
          </div>
        </div>

        <input
          type="radio"
          name="token_events_tab"
          role="tab"
          className="tab"
          aria-label="Approval Token Events"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          {/* withdrawn Events */}
          <TokenEventsList
            title="Approval Token Events"
            event="Approval"
            label1="Owner"
            label2="Spend"
            label3="Amount"
          />
        </div>
      </div>
    </div>
  );
};

export default EventsToken;
